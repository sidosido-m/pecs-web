import LargeButton from "../components/LargeButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      <img
        src="/logo_pecs.png"
        alt="PECS Kids Logo"
        style={styles.logo}
      />

      <h1 style={styles.title}>PECS Kids</h1>

      <p style={styles.subtitle}>
        Communication pour enfants non verbaux
      </p>

      <div style={styles.buttons}>
        <LargeButton
          text="Construction Libre"
          color="#4CAF50"
          onClick={() => navigate("/builder")}
        />

        <LargeButton
          text="Tableau Fixe"
          color="#FF9800"
          onClick={() => navigate("/fixed-board")}
        />

        <LargeButton
          text="Bibliothèque"
          color="#4CAF50"
          onClick={() => navigate("/library")}
        />

        <LargeButton
          text="Paramètres"
          color="#9E9E9E"
          onClick={() => navigate("/settings")}
        />

        <LargeButton
          text="Gestion"
          color="#607D8B"
          onClick={() => navigate("/manage")}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F5F0",
    padding: 20,
  },

  logo: {
    width: 220,
    marginBottom: 10,
  },

  title: {
    fontSize: 48,
    color: "#2E7D32",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#333",
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "100%",
    maxWidth: 300,
  },
};