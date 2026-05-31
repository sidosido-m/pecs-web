import { usePecsStore } from "../store/pecsStore";

export default function FixedBoard() {
  const store = usePecsStore();
const pictograms = store.getPictograms();

  // نعرض فقط العناصر الأساسية (مثل Android ensureDefaults)
  const fixedItems = pictograms.filter((item) =>
    ["Eau", "Pain", "Pomme", "Jouer", "Lait"].includes(item.name)
  );

  return (
    <div style={styles.container}>
      <h1>Tableau Fixe</h1>

      <div style={styles.grid}>
        {fixedItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} style={styles.img} />
            <p style={styles.text}>{item.name}</p>
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 15,
  },

  card: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    textAlign: "center",
    color: "white",
  },

  img: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },

  text: {
    marginTop: 8,
    fontSize: 18,
  },
};