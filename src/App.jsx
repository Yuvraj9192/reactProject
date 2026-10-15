
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./component/home";
import Register from "./component/Register";
import Contact from "./component/contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
