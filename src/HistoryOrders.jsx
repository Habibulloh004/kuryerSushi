import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import { useNetworkState } from "@uidotdev/usehooks";
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Link } from "react-router-dom";

const HistoryOrders = () => {
  const { authUser } = useAuthContext();
  const [dateOrders, setDateOrders] = useState(JSON.parse(localStorage.getItem("history-orders")) || null);
  const [loading, setLoading] = useState(false);
  const network = useNetworkState();
  const [date, setDate] = useState(
    JSON.parse(localStorage.getItem("input")) || ""
  );

  const submit = async () => {
    setLoading(true);
    try {
      const products = await axios.get(
        `${import.meta.env.VITE_API}/getTransaction?id=${
          authUser?.user_id
        }&date=${date?.replace(/-/g, "")}`
      );
      setDateOrders(products.data);
      setLoading(false);
      console.log(products.data);
      localStorage.setItem("history-orders", JSON.stringify(products.data));
      localStorage.setItem("input", JSON.stringify(date))
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <div className="container w-10/12 mx-auto mt-6 h-[85dvh]">
      {network.online ? (
        <div className="w-full h-full">
          <section className="pb-6">
            <p className="text-2xl">История заказов</p>
            <div className="flex justify-between items-center mt-3">
              <input
                type="date"
                value={date}
                className="border-primary border-2 rounded-md w-[55%] py-1 px-2"
                onChange={(e) => setDate(e.target.value)}
              />

              <button
                disabled={!date || loading}
                className={`bg-primary rounded-md p-2 px-4 text-white ${
                  loading || (!date && "bg-opacity-60")
                }`}
                onClick={() => submit()}
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    <p className="text-white">Загрузка</p>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-white animate-spin fill-primary/80"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Поиск"
                )}
              </button>
            </div>
            <article className="conatainer mt-4">
              {dateOrders?.length > 0 ? (
                <>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {dateOrders?.map((item, idx) => (
                      <Link
                        className="w-full text-center bg-primary/20 rounded-md p-2 "
                        key={idx}
                        to={`/history-orders/${item?.transaction_id}`}
                      >
                        {item?.transaction_id}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p>Заказов пока нет</p>
              )}
            </article>
          </section>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5">
          <MdSignalWifiConnectedNoInternet0 className="w-24 h-24" />
          <p className="text-2xl text-center">
            Пожалуйста, подключитесь к Интернету!
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryOrders;
