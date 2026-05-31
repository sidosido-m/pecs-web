import { usePecsStore } from "../store/pecsStore";

export default function Builder() {
  const {
    selectedWords,
    removeWord,
    clearSentence,
  } = usePecsStore();

  const sentence =
  selectedWords.length > 0
    ? "Je veux " + selectedWords.join(" ")
    : "";

  const speakSentence = () => {
    if (!sentence) return;

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "fr-FR";

    speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.container}>
      <h1>Construction de phrases</h1>

      <div style={styles.sentenceBox}>
        {sentence || "Ajoute des pictogrammes..."}
      </div>

      <div style={styles.actions}>
        <button onClick={clearSentence}>
          🧹 Effacer
        </button>

        <button onClick={speakSentence}>
          🔊 Parler
        </button>
      </div>

      <h3>Éléments ajoutés</h3>

      <div style={styles.words}>
        {selectedWords.map((word, index) => (
          <div
            key={index}
            style={styles.word}
            onClick={() => removeWord(word)}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  sentenceBox: {
    background: "white",
    borderRadius: 12,
    minHeight: 100,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
  },

  actions: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },

  words: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  word: {
    background: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    borderRadius: 10,
    cursor: "pointer",
  },
};