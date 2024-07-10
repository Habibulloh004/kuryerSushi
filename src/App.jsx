import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
          <div className="fixed bottom-5 right-5 z-[99999999]">
            <AiOutlineMenu
              className="w-5 h-5"
              onClick={() => setOpenNav((prev) => !prev)}
            />
            <article
              className={`absolute w-44 text-center text-sm bottom-0 right-10 flex gap-3 bg-primary/50 p-2 flex-col text-white rounded-md ${
                openNav ? "block" : "hidden"
              }`}
            >
              <Link onClick={() => openNav(false)} to={`/`}>
                Заказы
              </Link>
              <Link onClick={() => openNav(false)} to={`/history-orders`}>
                История заказов
              </Link>
              <span
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                <p className="ml-1">Выйти из аккаунта</p>
              </span>
            </article>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
