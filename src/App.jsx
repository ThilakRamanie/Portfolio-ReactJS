import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Portfolio-ReactJS/" element={<Home />} />
          <Route path="/about" element={<p>About</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
