import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExchangeRate from "./views/ExchangeRate";
import Calculator from "./views/Calculator";
import Graph from "./views/Graph";
import Details from "./views/Details";
import AddRate from "./views/AddRate";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExchangeRate />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/rates" element={<AddRate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
