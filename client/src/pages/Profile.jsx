import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading profile...</h2>;

  if (!user)
    return <h2 style={{ textAlign: "center" }}>No user found</h2>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
        }}
      >
        {/* LEFT CARD */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "white",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <span
            style={{
              background: "#e5e7eb",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            {user.role}
          </span>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* RIGHT DASHBOARD */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Account Dashboard</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                padding: "15px",
                background: "#f3f4f6",
                borderRadius: "10px",
              }}
            >
              <h3>Orders</h3>
              <p>View your order history</p>
              <button
                onClick={() => navigate("/orders")}
              >
                Go to Orders
              </button>
            </div>

            <div
              style={{
                padding: "15px",
                background: "#f3f4f6",
                borderRadius: "10px",
              }}
            >
              <h3>Cart</h3>
              <p>Check items in cart</p>
              <button
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            </div>

            <div
              style={{
                padding: "15px",
                background: "#f3f4f6",
                borderRadius: "10px",
              }}
            >
              <h3>Shop</h3>
              <p>Browse products</p>
              <button
                onClick={() => navigate("/products")}
              >
                Start Shopping
              </button>
            </div>

            <div
              style={{
                padding: "15px",
                background: "#f3f4f6",
                borderRadius: "10px",
              }}
            >
              <h3>Profile Info</h3>
              <p>User ID:</p>
              <small>{user._id}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;