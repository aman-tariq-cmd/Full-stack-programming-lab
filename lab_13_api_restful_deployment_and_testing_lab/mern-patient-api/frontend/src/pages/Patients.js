import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  /* GET PATIENTS */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/api/patients", {
        headers: { Authorization: token },
      })
      .then((res) => setPatients(res.data))
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("Unauthorized! Please login again.");
          navigate("/login");
        } else {
          setError("Failed to load patients.");
        }
      });
  }, [navigate]);

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const styles = {
    container: { maxWidth: 800, margin: "2rem auto", padding: "1rem", fontFamily: "Arial, sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    card: {
      border: "1px solid #ddd", borderRadius: 8, padding: "1rem",
      marginBottom: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
    },
    badge: {
      background: "#e8f4fd", color: "#2a6dbe", padding: "2px 8px",
      borderRadius: 12, fontSize: 13
    },
    logoutBtn: {
      background: "#e74c3c", color: "#fff", border: "none",
      padding: "0.5rem 1.2rem", borderRadius: 4, cursor: "pointer", fontSize: 14
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🏥 Patient Records</h1>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>
      <hr />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        patients.map((p) => (
          <div key={p._id} style={styles.card}>
            <h3>{p.name} <span style={styles.badge}>Age: {p.age}</span></h3>
            <p>🦠 Disease: {p.disease}</p>
            <p>📞 Contact: {p.contact}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Patients;
