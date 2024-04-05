import "./UserOrderPanel.css"
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import { useLocation } from "react-router-dom";
import Notify from "./components/Notify";
import OrderFinalisation from "./components/OrderFinalisation";

const UserOrderPanel = () => {
  // const locate = useLocation();
  return (
    <>
      <div className="UserOrderPanel-box">
        <Navbar />
        <Notify />
        <Filters />
        {/* <Filters filterSettings={locate.state}/> */}
      </div>
    </>
  );
};
export default UserOrderPanel;