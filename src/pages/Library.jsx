import { useState } from "react";
import { usePecsStore } from "../store/pecsStore";
import PictogramCard from "../components/PictogramCard";

export default function Library() {

  const store = usePecsStore();
  

  const selectedWords = store.selectedWords;
  const addWord = store.addWord;
  const pictograms = store.getPictograms();

  const [category, setCategory] = useState("Toutes");
  const [dragIndex, setDragIndex] = useState(null);
  const reorderPictograms = store.reorderPictograms;

  const filtered =
    category === "Toutes"
      ? pictograms
      : pictograms.filter((p) => p.category === category);

    const isFeeling = selectedWords.some(
  (w) => w.category === "Sentiment"
);

const sentence =
  selectedWords.length > 0
    ? (isFeeling ? "Je suis " : "Je veux ") +
      selectedWords.map((w) => w.name).join(" ")
    : "";

  return (
    <div style={styles.container}>
      <h2>Bibliothèque PECS</h2>

      {/* Phrase */}
      <h3 style={styles.sentence}>
  {sentence || "Appuie sur un pictogramme..."}
</h3>

      {/* Filters */}
      <div style={styles.filters}>
       {["Toutes", "Boissons", "Nourriture", "Actions", "Famille", "Sentiment"].map((c) => (
          <button key={c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {filtered.map((item, index) => (
          <div
  draggable
  onDragStart={() => setDragIndex(index)}
  onDragOver={(e) => e.preventDefault()}
  onDrop={() => reorderPictograms(dragIndex, index)}
>
  <PictogramCard
    item={item}
    onClick={() => addWord(item)}
  />
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
  sentence: {
    color: "#4CAF50",
    fontSize: 22,
  },
  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 15,
  },
};