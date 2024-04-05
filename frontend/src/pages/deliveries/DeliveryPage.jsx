import Navbar from "../../components/Navbar";
import DeliveryPanel from "./components/DeliveryPanel";
import Map from "./components/Map";
import Header from "../../components/Header";

const DeliveryPage = () => {
  return (
    <div className="App">
      <div className="delivery-page-grid">
        <Navbar props="delivery" />
        <Header />
        {/* <div className="delivery-page-main-content-grid"> */}
        <DeliveryPanel />
        {/* <Map /> */}
        {/* </div> */}
      </div>
    </div>
  );
};
export default DeliveryPage;
