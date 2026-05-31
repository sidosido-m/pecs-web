import { create } from "zustand";

const defaultPictograms = [
  { id: 1, name: "Eau", category: "Boissons", image: "/eau.png", isDefault: true },
  { id: 2, name: "Pain", category: "Nourriture", image: "/pain.png", isDefault: true },
  { id: 3, name: "Pomme", category: "Nourriture", image: "/pomme.png", isDefault: true },
  { id: 4, name: "Jouer", category: "Actions", image: "/jouer.png", isDefault: true },
  { id: 5, name: "Lait", category: "Boissons", image: "/lait.png", isDefault: true },
];

const loadFromStorage = () => {
  const data = localStorage.getItem("pictograms");
  return data ? JSON.parse(data) : [];
};
const mergePictograms = () => {
  const added = loadFromStorage();

  const filteredAdded = added.filter(
    (a) =>
      !defaultPictograms.some(
        (d) => d.id === a.id
      )
  );

  return [...defaultPictograms, ...filteredAdded];
};

const saveToStorage = (data) => {
  localStorage.setItem("pictograms", JSON.stringify(data));
};

export const usePecsStore = create((set, get) => ({
  // 🧠 sentence
  selectedWords: [],


  // ⚙️ settings
  voiceEnabled: true,
  addJeVeux: true,
  bigIcons: true,

   addedPictograms: loadFromStorage(),
    deletedDefaultIds: [],
    pictograms: [],

  // 🖼 pictograms (NEW)


  // ➕ WORDS
  addWord: (word) =>
  set((state) => ({
    selectedWords: [...state.selectedWords, word],
  })),

  removeWord: (word) =>
  set((state) => ({
    selectedWords: state.selectedWords.filter(
      (w) => w.name !== word.name
    ),
  })),

  clearSentence: () =>
    set({ selectedWords: [] }),

  // 🔊 SETTINGS
  toggleVoice: () =>
    set((state) => ({
      voiceEnabled: !state.voiceEnabled,
    })),

  toggleJeVeux: () =>
    set((state) => ({
      addJeVeux: !state.addJeVeux,
    })),

  toggleBigIcons: () =>
    set((state) => ({
      bigIcons: !state.bigIcons,
    })),

   initPictograms: () =>
  set(() => {
    const added = loadFromStorage();

    const filteredAdded = added.filter(
      (a) =>
        !defaultPictograms.some(
          (d) => d.id === a.id
        )
    );

    return {
      pictograms: [
        ...defaultPictograms,
        ...filteredAdded,
      ],
    };
  }),

  // 🧠 sentence builder
  getSentence: () => {
    const state = get();
    const sentence = state.selectedWords.join(" ");

    if (!sentence) return "";

    return state.addJeVeux
      ? `Je veux ${sentence}`
      : sentence;
  },

  getPictograms: () => {
  const state = get();

  const activeDefaults = defaultPictograms.filter(
    (d) => !state.deletedDefaultIds.includes(d.id)
  );

  return [...activeDefaults, ...state.addedPictograms];
},

  // ➕ ADD PICTOGRAM (NEW)
addPictogram: (pictogram) =>
  set((state) => {

    const existsInAdded = state.addedPictograms.some(
      (p) => p.name === pictogram.name
    );

    if (existsInAdded) {
      return state;
    }

    const updated = [
      ...state.addedPictograms,
      pictogram,
    ];

    saveToStorage(updated);

    return {
      addedPictograms: updated,
    };
  }),
   // ✏️ UPDATENPICTOGRAM (NEW)
  updatePictogram: (id, newName, newCategory) =>
  set((state) => {
    const updated = state.addedPictograms.map((p) =>
      p.id === id
        ? {
            ...p,
            name: newName,
            category: newCategory,
          }
        : p
    );

    saveToStorage(updated);

    return {
      addedPictograms: updated,
    };
  }),

  // 🗑 DELETE PICTOGRAM (NEW)
deletePictogram: (id) =>
  set((state) => {
    const isDefault = defaultPictograms.some((d) => d.id === id);

    const updatedAdded = state.addedPictograms.filter(
      (p) => p.id !== id
    );
    saveToStorage(updatedAdded);

    const updatedDeletedDefaults = isDefault
      ? [...state.deletedDefaultIds, id]
      : state.deletedDefaultIds;

    const activeDefaults = defaultPictograms.filter(
      (d) => !updatedDeletedDefaults.includes(d.id)
    );

    return {
      addedPictograms: updatedAdded,
      deletedDefaultIds: updatedDeletedDefaults,
      pictograms: [...activeDefaults, ...updatedAdded],
    };
  }),
   // DRAG
reorderPictograms: (startIndex, endIndex) =>
  set((state) => {
    const activeDefaults = defaultPictograms.filter(
      (d) => !state.deletedDefaultIds.includes(d.id)
    );

    const fullList = [
      ...activeDefaults,
      ...state.addedPictograms,
    ].filter(Boolean);

    const result = Array.from(fullList);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const newAdded = result.filter(
      (item) => !defaultPictograms.some(d => d.id === item.id)
    );

    return {
      addedPictograms: newAdded,
    };
  }),
  // 🔄 RESET DEFAULTS
resetPictograms: () =>
  set(() => ({
    deletedDefaultIds: [],
  })),
}));