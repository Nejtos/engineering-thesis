import "./DeliveryPanel.css";
import DriverBox from "./DriverBox";
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useState } from "react";
import Map from "./Map";
import CustomerCollection from "./CustomerCollection";

const DeliveryPanel = () => {
  const [deliveryFilter, setDeliveryFilter] = useState("Delivery");
  const styles = [
    {
      width: "20%",
      borderRadius: "16px",
      height: "52px",
      // backgroundColor: purple[400],
      "&:hover": {
        backgroundColor: purple[400],
        borderColor: purple[400],
        color: "white",
      },
      "&.selected": {
        backgroundColor: purple[400],
        borderColor: purple[400],
        color: "white",
      },
      borderColor: purple[400],
      color: purple[500],
    },
  ];

  return (
    <div className="delivery-panel-box">
      <div className="btns-section-filter">
        <Button
          className={deliveryFilter === "Delivery" ? "selected" : ""}
          variant="outlined"
          sx={styles[0]}
          onClick={() => setDeliveryFilter("Delivery")}
        >
          Home delivery
        </Button>
        <Button
          className={deliveryFilter === "Personal collection" ? "selected" : ""}
          variant="outlined"
          sx={styles[0]}
          onClick={() => setDeliveryFilter("Personal collection")}
        >
          Personal collection
        </Button>
      </div>
      {deliveryFilter === "Delivery" ? (
        <div className="delivery-page-main-content-grid">
          <DriverBox /> <Map />
        </div>
      ) : (
        <></>
      )}
            {deliveryFilter === "Personal collection" ? (
       <CustomerCollection />
      ) : (
        <></>
      )}
      {/* <DriverBox /> */}
      {/* <Map /> */}
    </div>
  );
};
export default DeliveryPanel;
