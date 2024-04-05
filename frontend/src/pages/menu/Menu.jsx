import Navbar from "../../components/Navbar";
import TopSellings from "./components/TopSellings";
import TopSellingsChart from "./components/TopSellingsChart";
import NotAvailable from "./components/NotAvailable";
import Promotions from "./components/Promotions";
import Header from "../../components/Header";
import "../Pages.css";

const Menu = () => {
  return (
    <div className="App">
      <div className="menu-page-grid">
        <Navbar props="menu" />
        <Header />
        <div className="menu-page-main-content-grid">
          <TopSellings />
          <TopSellingsChart />
          <NotAvailable />
          <Promotions />
        </div>
        {/* <div className="menu-page-flexbox">
          <div className="menu-page-flexbox-row1">
          <TopSellings />
            <TopSellingsChart />
          </div>
          <div className="menu-page-flexbox-row1">
          <NotAvailable />
            <Promotions />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Menu;
