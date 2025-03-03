import React, { useEffect, useState } from "react";
import MainTemplate from "../MainTemplate";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/crypto";
import useUserProduct from "../../../hooks/useUserProduct";

export default function DetailProduct() {
  const { id } = useParams();
  const { getOneProduct } = useUserProduct();
  const [product, setProduct] = useState(null);

  const decryptedId = decryptId(id);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const result = await getOneProduct(decryptedId);
        if (isMounted) {
          setProduct(result);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [decryptedId]);

  return (
    <MainTemplate>
      <div className="product-detail-container">
        <div className="product-detail-wrapper">
          <div className="product-detail-card">
            {/* Product Image */}
            <div className="product-detail-image-section">
              <div className="product-detail-image-wrapper group">
                <img
                  src={product?.image || "https://via.placeholder.com/600x400"}
                  alt={product?.name || "Product"}
                  className="product-detail-image"
                />
                <div className="product-detail-image-overlay"></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-detail-info">
              <div className="product-detail-content">
                <div>
                  <h1 className="product-detail-header">
                    {product?.product || "Loading..."}
                  </h1>
                  <div className="product-detail-stock">
                    <span className="product-detail-stock-badge">
                      {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    <span className="product-detail-stock-count">
                      {product?.stock || 0} items available
                    </span>
                  </div>
                </div>

                <div className="product-detail-price-section">
                  <div className="product-detail-price-wrapper">
                    <span className="product-detail-current-price">
                      ${product?.price || "0.00"}
                    </span>
                    {product?.discountPrice && (
                      <div className="flex items-center gap-2">
                        <span className="product-detail-original-price">
                          ${product.price}
                        </span>
                        <span className="product-detail-discount">
                          {Math.round(
                            ((product.price - product.discountPrice) /
                              product.price) *
                              100
                          )}
                          % OFF
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="product-detail-description">
                  <h2 className="product-detail-description-title">
                    Description
                  </h2>
                  <p className="product-detail-description-text">
                    {product?.description || "Loading description..."}
                  </p>
                </div>
              </div>

              <div>
                <button
                  className="product-detail-add-cart"
                  disabled={!product || product.stock === 0}
                >
                  {!product
                    ? "Loading..."
                    : product.stock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
