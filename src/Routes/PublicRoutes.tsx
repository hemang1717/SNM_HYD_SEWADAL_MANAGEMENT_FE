import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;
