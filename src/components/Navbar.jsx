import { useNetworkState } from "@uidotdev/usehooks";
import { Logo } from "../assets/index";

const Navbar = () => {
  //   const [isOnline, setIsOnline] = useState(false);
  //   const [status, setStatus] = useState(null);
  const network = useNetworkState();

  return (
    <nav className="bg-primary">
      <div className="container w-10/12 mx-auto py-2 flex items-center justify-between">
        <div className="img-container w-36">
          <img className="w-full h-full" src={Logo} alt="" />
        </div>
        <span
          className={`${
            network?.online ? "bg-green-400" : "bg-red-600"
          } w-3 h-3 rounded-full `}
        ></span>
      </div>
    </nav>
  );
};

export default Navbar;
