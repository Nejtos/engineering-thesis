import "../Pages.css";
import Navbar from "../../components/Navbar";
import OrdersList from "./components/OrdersList";
import { useState } from "react";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { purple, green, pink, amber } from "@mui/material/colors";

const OrdersPage = () => {
  const [ordersFilter, setOrderFilter] = useState("Ordered");
  const [activeBtn, setActiveBtn] = useState("Ordered");

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
    {
      width: "20%",
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
      width: "20%",
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
      width: "20%",
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
      <div className="orders-page-grid">
        <Navbar props="orders" />
        <Header />
        <div className="order-page-main-content-grid">
          <div className="orders-page-btns">
            <Button
              className={activeBtn === "Ordered" ? "selected" : ""}
              variant="outlined"
              sx={styles[0]}
              onClick={() => {
                setOrderFilter("Ordered");
                setActiveBtn("Ordered");
              }}
              // clickEvent={() => setOrderFilter("Ordered")}
            >
              Ordered
            </Button>
            <Button
              className={activeBtn === "Waiting" ? "selected" : ""}
              variant="outlined"
              sx={styles[1]}
              onClick={() => {
                setOrderFilter("Waiting");
                setActiveBtn("Waiting");
              }}
              // clickEvent={() => setOrderFilter("Waiting")}
            >
              Waiting
            </Button>
            <Button
              className={activeBtn === "Delivered" ? "selected" : ""}
              variant="outlined"
              sx={styles[2]}
              onClick={() => {
                setOrderFilter("Delivered");
                setActiveBtn("Delivered");
              }}
              // clickEvent={() => setOrderFilter("Delivered")}
            >
              Delivered
            </Button>
            <Button
              className={activeBtn === "Canceled" ? "selected" : ""}
              variant="outlined"
              sx={styles[3]}
              onClick={() => {
                setOrderFilter("Canceled");
                setActiveBtn("Canceled");
              }}
              // clickEvent={() => setOrderFilter("Canceled")}
            >
              Canceled
            </Button>
          </div>
          <OrdersList orderFilter={ordersFilter} />
        </div>
      </div>
    </div>
  );
};
export default OrdersPage;
