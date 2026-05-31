import { Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Builder from "./pages/Builder";
import Settings from "./pages/Settings";
import Manage from "./pages/Manage";
import FixedBoard from "./pages/FixedBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/fixed-board" element={<FixedBoard />} />
    </Routes>
  );
}

export default App;