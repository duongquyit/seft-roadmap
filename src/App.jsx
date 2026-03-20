import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TechLeadRoadmap from "./pages/TechLeadRoadmap.jsx";
import ClaudeCheatsheet from "./pages/ClaudeCheatsheet.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/techlead" element={<TechLeadRoadmap />} />
        <Route path="/claude" element={<ClaudeCheatsheet />} />
        {/* Thêm route mới ở đây */}
        {/* <Route path="/frontend" element={<FrontendRoadmap />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
