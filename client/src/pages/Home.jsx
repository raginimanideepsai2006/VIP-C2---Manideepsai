import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products.slice(0, 6)); // show only few
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      
      {/* HERO SECTION */}
      <div
        style={{
          background: "linear-gradient(to right,#111827,#2563eb)",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>Welcome to SHOPEZ 🛍️</h1>
        <p>Shop the best products at unbeatable prices</p>

        <Link to="/products">
          <button
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              border: "none",
              background: "white",
              color: "black",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Start Shopping
          </button>
        </Link>
      </div>

      {/* CATEGORIES */}
      <div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "15px",
  }}
>
  {["Mobiles", "Laptops", "Fashion", "Electronics"].map((cat) => (
    <Link
      key={cat}
      to={`/products?category=${cat}`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          minWidth: "120px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {cat}
      </div>
    </Link>
  ))}
</div>
      {/* FEATURED PRODUCTS */}
      <div style={{ padding: "30px" }}>
        <h2>Featured Products</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={
                  p.image ||
                  "https://via.placeholder.com/150"
                }
                alt={p.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                }}
              />

              <h4>{p.title}</h4>
              <p>₹{p.price}</p>

              <Link to={`/product/${p._id}`}>
                <button
                  style={{
                    padding: "8px",
                    width: "100%",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;