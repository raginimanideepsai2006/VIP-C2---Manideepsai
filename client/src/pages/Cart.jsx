import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully");
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Error placing order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>
      {cart?.products?.length === 0 && (
  <h3>Your cart is empty 🛒</h3>
)}
      {cart?.products?.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          {/* IMAGE */}
          <img
            src={
              item.productId?.image ||
              "https://via.placeholder.com/80"
            }
            alt="product"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
              background: "#f5f5f5",
              borderRadius: "6px",
            }}
          />

          {/* DETAILS */}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0 }}>
              {item.productId?.title}
            </h3>

            <p style={{ margin: "5px 0" }}>
              ₹{item.productId?.price}
            </p>

            <p>Qty: {item.quantity}</p>
          </div>

          <button
            onClick={() =>
              removeFromCart(item.productId._id)
            }
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "5px",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      {cart?.products?.length > 0 && (
        <button
          onClick={placeOrder}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Place Order
        </button>
      )}
    </div>
  );
}

export default Cart;