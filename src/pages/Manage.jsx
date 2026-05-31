import { useState } from "react";
import { usePecsStore } from "../store/pecsStore";


export default function Manage() {

 const store = usePecsStore();
const pictograms = store.getPictograms();
const [editItem, setEditItem] = useState(null);
const [newName, setNewName] = useState("");
const [newCategory, setNewCategory] = useState("");

const addPictogram = usePecsStore((state) => state.addPictogram);
const updatePictogram = usePecsStore((state) => state.updatePictogram);
const deletePictogram = usePecsStore((state) => state.deletePictogram);
const resetPictograms = usePecsStore((state) => state.resetPictograms);


  const presets = [
  { name: "Bonbons", category: "Nourriture", image: "/bonbons.png" },
  { name: "Chocolat", category: "Nourriture", image: "/chocolat.png" },
  { name: "Oeuf", category: "Nourriture", image: "/oeuf.png" },
  { name: "Banane", category: "Nourriture", image: "/banane.png" },
  { name: "Papa", category: "Famille", image: "/papa.png" },
  { name: "Maman", category: "Famille", image: "/maman.png" },
  { name: "Frere", category: "Famille", image: "/frere.png" },
  { name: "Soeur", category: "Famille", image: "/soeur.png" },
  { name: "Grand-Pere", category: "Famille", image: "/grand_pere.png" },
  { name: "Grand-Mere", category: "Famille", image: "/grand_mere.png" },
  { name: "Heureux", category: "Sentiment", image: "/heureux.png" },
  { name: "Triste", category: "Sentiment", image: "/triste.png" },
  { name: "Colere", category: "Sentiment", image: "/colere.png" },
  { name: "fatigué", category: "Sentiment", image: "/fatigue.png" },
];
  

 const handleAdd = (item) => {
  const exists = pictograms.some(
    (p) => p.name === item.name
  );
  

  if (exists) return; // ما يعاودش يضيفها

  const newPicto = {
    id: Date.now() + Math.random(),
    name: item.name,
    category: item.category,
    image: item.image,
  };

  addPictogram(newPicto);
};

const reorderPictograms = usePecsStore(
  (state) => state.reorderPictograms
);

const [dragIndex, setDragIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h1>Gestion des pictogrammes</h1>

      {/* FORM */}
      <div style={styles.form}>

      <button
  onClick={() => {
    const nextPicto = presets.find(
      (preset) =>
        !pictograms.some((p) => p.name === preset.name)
    );

    if (nextPicto) {
      handleAdd(nextPicto);
    }
  }}
  style={styles.addBtn}
>
  ➕ Ajouter des pictogrammes
</button>

        <button onClick={resetPictograms} style={styles.resetBtn}>
          🔄 Reset
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {pictograms
  .filter(item => item && item.image)
  .map((item, index) => (
          <div
  key={item.id}
  style={styles.card}
  draggable
  onDragStart={() => setDragIndex(index)}
  onDragOver={(e) => e.preventDefault()}
  onDrop={() => reorderPictograms(dragIndex, index)}
>
            <img
              src={item.image}
              alt={item.name}
              style={styles.img}
            />

            <div>
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
 <button
  onClick={() => {
    setEditItem(item);
    setNewName(item.name);
    setNewCategory(item.category);
  }}
  style={styles.editBtn}
>
  ✏️
</button>

  <button
    onClick={() => deletePictogram(item.id)}
    style={styles.deleteBtn}
  >
    🗑
  </button>
</div>
          </div>
        ))}
      </div>
      {editItem && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h3>Modifier pictogramme</h3>

      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Nom"
        style={styles.input}
      />

      <input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Catégorie"
        style={styles.input}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => {
            updatePictogram(
              editItem.id,
              newName,
              newCategory
            );

            setEditItem(null);
          }}
          style={styles.saveBtn}
        >
          💾 Sauvegarder
        </button>

        <button
          onClick={() => setEditItem(null)}
          style={styles.cancelBtn}
        >
          ❌ Annuler
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 400,
    marginBottom: 20,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  addBtn: {
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  resetBtn: {
    padding: 10,
    backgroundColor: "#FF9800",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  list: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 10,
    background: "#f5f5f5",
    borderRadius: 10,
  },

  img: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },

  editBtn: {
  background: "#2196F3",
  color: "white",
  border: "none",
  padding: 8,
  borderRadius: 6,
  cursor: "pointer",
},

  deleteBtn: {
    marginLeft: "auto",
    background: "red",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer",
  },
  addBtn: {
  padding: 12,
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 18,
},

modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},

modal: {
  background: "white",
  padding: 20,
  borderRadius: 12,
  width: 300,
  display: "flex",
  flexDirection: "column",
  gap: 10,
},

saveBtn: {
  flex: 1,
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: 10,
  borderRadius: 8,
},

cancelBtn: {
  flex: 1,
  background: "#f44336",
  color: "white",
  border: "none",
  padding: 10,
  borderRadius: 8,
},

};