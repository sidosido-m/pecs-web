export default function LargeButton({
  text,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 15,
        borderRadius: 12,
        border: "none",
        color: "white",
        fontSize: 18,
        cursor: "pointer",
        backgroundColor: color,
      }}
    >
      {text}
    </button>
  );
}