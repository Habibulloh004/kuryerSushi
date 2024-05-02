import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import Navbar from "./components/Navbar";
import HistoryOrders from "./HistoryOrders";
import HistoryOrder from "./HistoryOrder";
import { AiOutlineMenu } from "react-icons/ai";

function App() {
  const { authUser } = useAuthContext();
  const [openNav, setOpenNav] = useState(false);
  const path = useLocation();
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
      <div
        className={`top-0 w-full z-50 ${
          path.pathname == "/login"
            ? "h-[0dvh] static hidden"
            : "h-[10dvh] fixed"
        } `}
      >
        <Navbar />
      </div>
      <div
        className={`absolute w-full ${
          path.pathname == "/login" ? "h-[100dvh]" : "h-[90dvh] top-[10dvh]"
        } `}
      >
        <Routes>
          <Route
            path="/"
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/:id"
            element={authUser ? <OrderDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/history-orders"
            element={authUser ? <HistoryOrders /> : <Navigate to="/login" />}
          />
          <Route
            path="/history-orders/:id"
            element={authUser ? <HistoryOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {path.pathname == "/login" ? null : (
          <div className="fixed bottom-5 right-5 z-[999]">
            <AiOutlineMenu
              className="w-5 h-5"
              onClick={() => setOpenNav((prev) => !prev)}
            />
            <article
              className={`absolute w-40 text-center text-sm bottom-0 right-10 flex gap-3 bg-primary/50 p-2 flex-col text-white rounded-md ${
                openNav ? "block" : "hidden"
              }`}
            >
              <Link onClick={() => openNav(false)} to={`/`}>
                Заказы
              </Link>
              <Link onClick={() => openNav(false)} to={`/history-orders`}>
                История заказов
              </Link>
            </article>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
