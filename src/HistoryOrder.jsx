import { useNetworkState } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { f } from "./utils";

const HistoryOrder = () => {
  const { id } = useParams();
  const [spots, setSpots] = useState([]);
  const [myOrder, setMyOrder] = useState(null);
  const network = useNetworkState();
  const navigate = useNavigate();

  useEffect(() => {
    setMyOrder(
      JSON.parse(localStorage.getItem("history-orders")).find(
        (item) => item.transaction_id == id
      )
    );
  }, []);

  const fetchSpot = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/getSpot`);
    setSpots(data);
  };

  useEffect(() => {
    fetchSpot();
  }, []);

  const findSpotName = spots?.find(
    (item) => item?.spot_id == +myOrder?.spot_id
  );

  if (!spots || !myOrder) {
    return (
      <div className="h-[500px] w-full justify-center flex items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-400 fill-primary"
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
    );
  }

  console.log(myOrder);
  return (
    <main>
      <div className="container w-10/12 mx-auto mt-6 h-[85dvh]">
        {network.online ? (
          <div className="w-full h-full">
            <button
              className="py-1 px-3 bg-primary bg-opacity-20 rounded-md flex items-center gap-1"
              onClick={() => navigate(-1)}
            >
              {" "}
              <IoMdArrowRoundBack />
              <p>Назад</p>
            </button>
            <section className="mt-5 flex flex-col gap-2 text-lg font-bold">
              <p className="">
                Филиал:{" "}
                <span className="font-normal">
                  {findSpotName?.name ? findSpotName?.name : "Loading..."}
                </span>
              </p>
              <p className="">
                Номер клиента:{" "}
                <a
                  className="font-normal"
                  href={`tel:${myOrder?.client_phone?.replace(/\s/g, "")}`}
                >
                  {myOrder?.client_phone}
                </a>
              </p>
              <p className="text-ellipsis whitespace-nowrap w-full overflow-hidden">
                Адрес клиента: <br />{" "}
                <span className="font-normal">
                  {myOrder?.delivery.address1}
                </span>
              </p>
              <span>
                <p>Товары:</p>
                <ol className="list-decimal my-2 mx-2 text-sm font-normal">
                  {myOrder?.products.map((prod, idx) => {
                    const findProductName = myOrder?.products_name?.find(
                      (item) => item.product_id == prod.product_id
                    );
                    return (
                      <li key={idx} className="flex gap-1">
                        <p>{prod.num.split(".").slice(0, 1)}. шт / гр |</p>
                        <p>{findProductName?.product_name}</p>
                      </li>
                    );
                  })}
                </ol>
              </span>
              <div className="price font-normal text-base flex flex-col gap-2">
                <span>
                  Итого:{" "}
                  {f(
                    myOrder.backOrder
                      ? myOrder?.backOrder?.all_price / 100
                      : myOrder.sum / 100
                  )}{" "}
                  сум
                </span>
                <span>
                  Бонусы:{" "}
                  {f(
                    myOrder.backOrder
                      ? myOrder?.backOrder?.payed_bonus / 100
                      : myOrder.payed_bonus / 100
                  )}{" "}
                  сум
                </span>
                <span>
                  К оплате:{" "}
                  {f(
                    myOrder.backOrder
                      ? myOrder?.backOrder?.payed_sum / 100
                      : (Number(myOrder.payed_cash) +
                          Number(myOrder.payed_card)) /
                          100
                  )}{" "}
                  сум
                </span>
                <span>Доставка: {f(10000)} сум</span>
              </div>
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
    </main>
  );
};

export default HistoryOrder;
