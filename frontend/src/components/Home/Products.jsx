import React from "react";
import { ShoppingCartIcon, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { encryptId } from "../../utils/crypto";
import { createImageUrl } from "../../utils/ImageUrlHelper";

export default function Products({ products, openModal, user }) {
  const navigate = useNavigate();

  const handleCartClick = (e, product) => {
    e.preventDefault(); // Prevent link navigation
    if (!user) {
      navigate("/login"); // Redirect to login if no user
    } else {
      openModal(product); // Open cart modal if user exists
    }
  };

  const handleViewDetails = (e, productId) => {
    e.preventDefault();
    if (!user) {
      // Save the intended destination before redirecting to login
      sessionStorage.setItem(
        "redirectAfterLogin",
        `/product/${encryptId(productId)}`
      );
      navigate("/login");
    } else {
      navigate(`/product/${encryptId(productId)}`);
    }
  };

  return (
    <section id="products">
      <h2 className="products-title">
        <ShoppingCartIcon className="w-8 h-8 text-indigo-500" />
        Product List
      </h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-container">
              <img
                src={createImageUrl(
                  process.env.REACT_APP_PRODUCT_URL,
                  product?.image
                )}
                alt={product.product}
                className="product-image"
              />
              <div className="product-image-overlay">
                <Eye className="w-8 h-8 text-white" />
              </div>
              {product.discountPrice && (
                <div className="product-discount-badge">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100
                  )}
                  % OFF
                </div>
              )}
            </div>

            <div className="product-content">
              <div className="mb-4">
                <h3 className="product-title">{product.product}</h3>
                <p className="product-store">Store: {product.seller}</p>
                <p className="product-store">Stock: {product.stock}</p>
              </div>

              <div className="product-price-container">
                <div>
                  {product.discountPrice ? (
                    <div className="flex flex-col">
                      <span className="product-original-price">
                        ${product.price}
                      </span>
                      <span className="product-discount-price">
                        ${product.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="product-regular-price">
                      ${product.price}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => handleCartClick(e, product)}
                  className="product-cart-button"
                  title={user ? "Add to Cart" : "Login to Add to Cart"}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
              </div>
              <div
                onClick={(e) => handleViewDetails(e, product.id)}
                className="cursor-pointer"
              >
                <div className="pt-4 border-t">
                  <span className="product-view-details">View Details</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
