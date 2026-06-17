import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/cart",
        {
          productId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (error) {
      alert("Login required");
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "30px", display: "flex", gap: "30px" }}>
      <img
        src={
          product.image ||
          "https://via.placeholder.com/300"
        }
        alt={product.title}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain",
          background: "#f5f5f5",
          borderRadius: "10px",
        }}
      />

      <div>
        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <h2>₹{product.price}</h2>

        <p>Stock: {product.stock}</p>

        <button
          onClick={addToCart}
          style={{
            padding: "10px 15px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;