import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = () => {
  const location = useLocation();
  const { groceryItem } = location.state || {};
  const [qty, setQty] = useState(1);

  const handleIncrement = () => {
    if (qty < groceryItem.pqty) {
      setQty(qty + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image">
          <img src={groceryItem.image} alt={groceryItem.name} />
        </div>
        
        <div className="product-details">
            <div className="product-name">{groceryItem.name}</div>
            <div className="product-rating">★ {groceryItem.rating}</div>
          

          <p className="product-description">{groceryItem.description}</p>
          
          <div className="product-price">₹{groceryItem.price}</div>

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
                disabled={qty >= groceryItem.pqty}
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
  );
};

export default ProductItem;