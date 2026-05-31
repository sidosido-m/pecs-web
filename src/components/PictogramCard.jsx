export default function PictogramCard({ item, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <img src={item.image} style={styles.img} />
      <p style={styles.text}>{item.name}</p>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    textAlign: "center",
    cursor: "pointer",
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