import { usePecsStore } from "../store/pecsStore";

export default function Settings() {
  const {
    voiceEnabled,
    addJeVeux,
    bigIcons,
    toggleVoice,
    toggleJeVeux,
    toggleBigIcons,
  } = usePecsStore();

  return (
    <div style={styles.container}>
      <h1>Paramètres</h1>

      <div style={styles.row}>
        <span>🔊 Voix</span>

        <input
          type="checkbox"
          checked={voiceEnabled}
          onChange={toggleVoice}
        />
      </div>

      <div style={styles.row}>
        <span>🧠 Ajouter "Je veux"</span>

        <input
          type="checkbox"
          checked={addJeVeux}
          onChange={toggleJeVeux}
        />
      </div>

      <div style={styles.row}>
        <span>📏 Gros pictogrammes</span>

        <input
          type="checkbox"
          checked={bigIcons}
          onChange={toggleBigIcons}
        />
      </div>

      <p style={styles.note}>
        Mode adapté aux enfants autistes
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: "auto",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #ddd",
  },

  note: {
    marginTop: 40,
    textAlign: "center",
  },
};