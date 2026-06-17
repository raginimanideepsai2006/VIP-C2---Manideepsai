import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <h3>{product.title}</h3>

        <p>₹{product.price}</p>

        <button onClick={() => addToCart(product._id)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;