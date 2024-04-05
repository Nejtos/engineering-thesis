import "../Pages.css";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { purple, green, pink, amber } from "@mui/material/colors";
import { useState } from "react";
import DailySales from "./components/DailySales";
import TotalMonthlyIncome from "./components/TotalMonthlyIncome";
import DailyOrders from "./components/DailyOrders";
import MonthlySales from "./components/MonthlySales";
import AnnualSales from "./components/AnnualSales";
import TotalBalance from "./components/TotalBalance";
import TopSellings from "./components/TopSellings";
import Promotions from "./components/SuppliesRatio";
import SuppliesRatio from "./components/SuppliesRatio";

const OrdersPage = () => {
  const [activeBtn, setActiveBtn] = useState("Daily sales");

  const styles = [
    {
      width: "22%",
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
    {
      width: "22%",
      borderRadius: "20px",
      height: "52px",
      // backgroundColor: green[700],
      "&:hover": {
        backgroundColor: green[600],
        borderColor: green[600],
        color: "white",
      },
      "&.selected": {
        backgroundColor: green[600],
        borderColor: green[600],
        color: "white",
      },
      borderColor: green[600],
      color: green[900],
    },
    {
      width: "22%",
      borderRadius: "20px",
      height: "52px",
      // backgroundColor: pink[400],
      "&:hover": {
        backgroundColor: amber[600],
        borderColor: amber[600],
        color: "white",
      },
      "&.selected": {
        backgroundColor: amber[600],
        borderColor: amber[600],
        color: "white",
      },
      borderColor: amber[600],
      color: amber[700],
    },
    {
      width: "22%",
      borderRadius: "20px",
      height: "52px",
      // backgroundColor: pink[400],
      "&:hover": {
        backgroundColor: pink[400],
        borderColor: pink[400],
        color: "white",
      },
      "&.selected": {
        backgroundColor: pink[400],
        borderColor: pink[400],
        color: "white",
      },
      borderColor: pink[400],
      color: pink[700],
    },
  ];

  return (
    <div className="App">
      <div className="analytics-page-grid">
        <Navbar props="analytics" />
        <Header />
        <div className="analytics-page-main-content-grid">
          <div className="analytics-page-btns">
            <div className="x" style={{ width: "100%" }}>
              <Button
                className={activeBtn === "Daily sales" ? "selected" : ""}
                variant="outlined"
                sx={styles[0]}
                onClick={() => {
                  setActiveBtn("Daily sales");
                }}
              >
                Daily sales
              </Button>
              <Button
                className={activeBtn === "Monthly sales" ? "selected" : ""}
                variant="outlined"
                sx={styles[1]}
                onClick={() => {
                  setActiveBtn("Monthly sales");
                }}
              >
                Monthly sales
              </Button>
              <Button
                className={
                  activeBtn === "Top sellings" ? "selected" : ""
                }
                variant="outlined"
                sx={styles[2]}
                onClick={() => {
                  setActiveBtn("Top sellings");
                }}
              >
                Top Sellings
              </Button>
              <Button
                className={
                  activeBtn === "Annual sales" ? "selected" : ""
                }
                variant="outlined"
                sx={styles[3]}
                onClick={() => {
                  setActiveBtn("Annual sales");
                }}
              >
                Annual sales
              </Button>
            </div>
            <div className="x" style={{ width: "100%" }}>
              <Button
                className={activeBtn === "Orders of the day" ? "selected" : ""}
                variant="outlined"
                sx={styles[0]}
                onClick={() => {
                  setActiveBtn("Orders of the day");
                }}
              >
                Orders of the day
              </Button>
              <Button
                className={
                  activeBtn === "Total monthly balance" ? "selected" : ""
                }
                variant="outlined"
                sx={styles[1]}
                onClick={() => {
                  setActiveBtn("Total monthly balance");
                }}
              >
                Total monthly balance
              </Button>
              <Button
                className={activeBtn === "Stationary/delivery ratio" ? "selected" : ""}
                variant="outlined"
                sx={styles[2]}
                onClick={() => {
                  setActiveBtn("Stationary/delivery ratio");
                }}
              >
                Stationary/delivery ratio
              </Button>
              <Button
                className={activeBtn === "Total balance" ? "selected" : ""}
                variant="outlined"
                sx={styles[3]}
                onClick={() => {
                  setActiveBtn("Total balance");
                }}
              >
                Total balance
              </Button>
            </div>
          </div>
          <div className="analytics-box">
            {activeBtn === "Daily sales" ? <DailySales /> : null}
            {activeBtn === "Monthly sales" ? <MonthlySales /> : null}
            {activeBtn === "Orders of the day" ? <DailyOrders /> : null}
            {activeBtn === "Total monthly balance" ? (
              <TotalMonthlyIncome />
            ) : null}
            {activeBtn === "Top sellings" ? <TopSellings /> : null}
            {activeBtn === "Stationary/delivery ratio" ? <SuppliesRatio /> : null}
            {activeBtn === "Annual sales" ? <AnnualSales /> : null}
            {activeBtn === "Total balance" ? <TotalBalance /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersPage;
