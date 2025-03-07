import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import { useEffect } from "react";
import { useAuth } from "./context/authContext";
function App() {
  const { isSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("authToken");
  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/") {
        navigate("/attendanceSheet");
      } else navigate(location.pathname);
    }
  }, [isSignIn]);
  return (
    <div className="flex min-h-dvh min-w-dvw ">
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </div>
  );
}

export default App;
