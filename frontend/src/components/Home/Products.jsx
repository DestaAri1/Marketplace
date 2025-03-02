import React from "react";
import { ShoppingCartIcon, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products({ products }) {
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent link navigation when clicking the cart button
    // Add your cart logic here
    console.log("Adding to cart:", product);
  };

  return (
    <section id="products">
      <h2 className="products-title">
        <ShoppingCartIcon className="w-8 h-8 text-indigo-500" />
        Product List
      </h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <Link
            to={`/product/${product.id}`}
            key={index}
            className="product-card"
          >
            <div className="product-image-container">
              <img
                src={product.image}
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
                  onClick={(e) => handleAddToCart(e, product)}
                  className="product-cart-button"
                  title="Add to Cart"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-4 border-t">
                <span className="product-view-details">View Details</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
