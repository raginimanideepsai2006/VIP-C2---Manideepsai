import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h3>Order ID: {order._id}</h3>

          <p>Status: {order.status}</p>

          <p>Total: ₹{order.totalAmount}</p>

          {/* PRODUCTS INSIDE ORDER */}
          {orders.length === 0 && (
           <h3>No orders yet 📦</h3>
          )}
          {order.products.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <img
                src={
                  item.productId?.image ||
                  "https://via.placeholder.com/60"
                }
                alt="product"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  background: "#f5f5f5",
                  borderRadius: "6px",
                }}
              />

              <div>
                <p style={{ margin: 0 }}>
                  {item.productId?.title}
                </p>

                <p style={{ margin: 0 }}>
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;