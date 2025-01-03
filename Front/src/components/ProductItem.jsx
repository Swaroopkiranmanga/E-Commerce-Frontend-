import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = () => {
  const location = useLocation();
  const { groceryItem, result } = location.state || {};
  const [qty, setQty] = useState(1);

  const selectedItem = result || groceryItem; // Determine which item to display

  const handleIncrement = () => {
    if (qty < selectedItem.pqty) {
      setQty(qty + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return selectedItem ? (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image">
          <img src={selectedItem.image} alt={selectedItem.name} />
        </div>

        <div className="product-details">
          <div className="product-name">{selectedItem.name}</div>
          <div className="product-rating">★ {selectedItem.rating}</div>

          <p className="product-description">{selectedItem.description}</p>

          <div className="product-price">₹{selectedItem.price}</div>

          <div className="quantity-section">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button
                onClick={handleDecrement}
                className="qty-btn"
                disabled={qty <= 1}
              >
                -
              </button>
              <span className="qty-display">{qty}</span>
              <button
                onClick={handleIncrement}
                className="qty-btn"
                disabled={qty >= selectedItem.pqty}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No item selected</div>
  );
};

export default ProductItem;
