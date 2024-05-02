import { useNetworkState } from "@uidotdev/usehooks";
import { Logo } from "../assets/index";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const network = useNetworkState();

  return (
    <nav className={`bg-primary h-full flex items-center`}>
      <div className="container w-10/12 mx-auto py-2 flex items-center justify-between">
        <div className="img-container w-36">
          <img className="w-full h-full" src={Logo} alt="" />
        </div>
        <span
          onClick={() => setToggle((prev) => !prev)}
          className={`${
            network?.online ? "bg-green-400" : "bg-red-600"
          } w-3 h-3 rounded-full relative`}
        >
          <span className={`absolute top-5 right-0`}>
            <Popup toggle={toggle} network={network.online} />
          </span>
        </span>
      </div>
    </nav>
  );
};

const Popup = ({ network, toggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: !toggle ? 0 : 1, y: !toggle ? -10 : 0 }}
      transition={{ duration: 0.2 }}
      className={`bg-third py-2 px-4 rounded-lg rounded-tr-sm`}
    >
      {network ? "You're online" : "You're offline"}
    </motion.div>
  );
};

export default Navbar;
