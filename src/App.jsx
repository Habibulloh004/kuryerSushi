import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Order from "./Order";
import { useEffect } from "react";

function App() {
  const { authUser } = useAuthContext();
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("date"));
    if (item && item.expiresAt < Date.now()) {
      localStorage.removeItem("chat-user");
      localStorage.removeItem("date");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={authUser ? <Order /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
