import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  return (
    <main>
      <Navbar />
    </main>
  );
};

export default Dashboard;
