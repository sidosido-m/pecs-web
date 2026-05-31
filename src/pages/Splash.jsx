import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>PECS Kids</h1>
      <p>Communication for children</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#F8F5F0",
  },
  title: {
    fontSize: 40,
    color: "#2E7D32",
  },
};