const defaultPictograms = [
  { id: 1, name: "Eau", category: "Boissons", image: drawable.eau },
  { id: 2, name: "Pain", category: "Nourriture", image: drawable.pain },
  { id: 3, name: "Pomme", category: "Nourriture", image: drawable.pomme },
  { id: 4, name: "Jouer", category: "Actions", image: drawable.jouer },
  { id: 5, name: "Lait", category: "Boissons", image: drawable.lait },
];

const loadFromStorage = () => {
  const data = localStorage.getItem("pictograms");
  return data ? JSON.parse(data) : [];
};