import { Link } from "react-router-dom";

const OrderList = ({ newOrders }) => {
  return (
    <div className="flex flex-col gap-3">
      {newOrders?.map((order, idx) => {
        return <OrderItem key={idx} newOrder={order} />;
      })}
    </div>
  );
};

const OrderItem = ({ newOrder }) => {
  const getStatus = (status) => {
    switch (status) {
      case "waiting":
        return "Ожидание";
      case "delivery":
        return "Доставка";
      default:
        break;
    }
  };

  return (
    <Link
      to={`/${newOrder?.order_id}`}
      className="bg-primary/30 py-2 px-3 rounded-md gap-2 flex justify-between items-center"
    >
      <span className="text-lg font-semibold text-black/70">{newOrder?.order_id}</span>
      <span className={`${getStatus(newOrder?.status) == "Доставка" ? "bg-yellow-500" : "bg-red-500"} text-white py-1 px-2 rounded-md`}>{getStatus(newOrder?.status)}</span>
      {/* 
      <p className="">{order.client_address}</p>
      <span className="ml-auto">{order.name}</span> */}
    </Link>
  );
};

export default OrderList;
