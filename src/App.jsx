import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MusicPlayer from "./Pages/MusicPlayer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/music" />} />
        <Route path="/music" element={<MusicPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
