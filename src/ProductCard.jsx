import { useState } from "react";
import "./ProductCard.css"

const ProductCard = ({ product, addToCart }) => {
  const [showDetails, setShowDetails] = useState(false);

  const displayDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className='product-card' style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <div>
        <img src={product.image} alt={product.title} style={{ width: "100%", height: "150px", objectFit: "contain" }} />
      </div>
      <div>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p 
          onClick={displayDetails} 
          id="details" 
          style={{ cursor: "pointer", color: "blue" }}
        >
          {showDetails ? product.description || "No details available" : "Show Details"}
        </p>
        <p>{product.category}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
