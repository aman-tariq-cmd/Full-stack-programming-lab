import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
      navigate("/patients");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const styles = {
    container: {
      maxWidth: 400,
      margin: "80px auto",
      padding: "2rem",
      border: "1px solid #ddd",
      borderRadius: 8,
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    input: {
      width: "100%",
      padding: "0.6rem",
      margin: "0.5rem 0 1rem",
      fontSize: 16,
      borderRadius: 4,
      border: "1px solid #ccc",
      boxSizing: "border-box"
    },
    button: {
      width: "100%",
      padding: "0.7rem",
      background: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: 4,
      fontSize: 16,
      cursor: "pointer"
    },
    error: { color: "red", marginTop: "0.5rem" }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>🏥 Patient Portal Login</h2>
      <label>Username</label>
      <input
        style={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <label>Password</label>
      <input
        style={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button style={styles.button} onClick={handleLogin}>Login</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

export default Login;
