import Order from "./Order";
import { useNetworkState } from "@uidotdev/usehooks";
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const Dashboard = () => {
  const network = useNetworkState();

  return (
    <main>
      <div className="container w-10/12 mx-auto mt-6 h-[85dvh]">
        {network.online ? (
          <>
            <div className="w-full h-full">
              <Order />
            </div>
          </>
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

export default Dashboard;
