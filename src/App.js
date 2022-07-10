import "antd/dist/antd.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
