// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Calculator from "./views/Calculator";
import Graph from "./views/Graph";
import Details from "./views/Details";
import AddRate from "./views/AddRate";
import UpdateRate from "./views/UpdateRate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/rates" element={<AddRate />} />
      <Route path="/edit/:id" element={<UpdateRate />} />
    </Routes>
  );
};

export default AppRoutes;
