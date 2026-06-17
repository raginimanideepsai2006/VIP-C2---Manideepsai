import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.products);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    const token = localStorage.getItem("token");

    await api.post("/products", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Product added");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* ADD PRODUCT FORM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          maxWidth: "600px",
        }}
      >
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        <input name="stock" placeholder="Stock" onChange={handleChange} />
      </div>

      <button
        onClick={addProduct}
        style={{
          marginTop: "10px",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
        }}
      >
        Add Product
      </button>

      {/* PRODUCT LIST */}
      <h2 style={{ marginTop: "30px" }}>All Products</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ddd",
            marginTop: "10px",
          }}
        >
          <span>{p.title}</span>

          <button
            onClick={() => deleteProduct(p._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;