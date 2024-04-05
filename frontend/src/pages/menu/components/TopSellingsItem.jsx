import "./TopSellingsItem.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import { items } from "../../order-panel/components/Data.jsx";
import { slideLeft } from "../../../util/slideLeft.jsx";
import { slideRight } from "../../../util/slideRight.jsx";
import leftArrow from "../../../img/left-arrow.png";
import rightArrow from "../../../img/right-arrow.png";
import { Button } from "@mui/material";

const TopSellingsItem = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/menu/orderedCounter", {})
      .then((response) => {
        setOrders(response.data);
      });

    axios.get("http://localhost:8000/data", {}).then((response) => {
      setItems(response.data);
    });
  }, []);

  const getValue = (x) => {
    let z = 0;
    items.forEach((element) => {
      element.description === x ? (z = element.price) : null;
    });
    return z;
  };

  const getImg = (x) => {
    let z = "http://localhost:8000/images/";
    items.forEach((element) => {
      element.description === x ? (z += element.img) : null;
    });
    return z;
  };

  // const getValue = (x) => {
  //   let z = 0;
  //   items.forEach((element) => {
  //     element.description === x ? (z = element.price) : null;
  //   });
  //   return z.toFixed(2);
  // };

  // const getImg = (x) => {
  //   let z = "";
  //   items.forEach((element) => {
  //     element.description === x ? (z = element.img) : null;
  //   });
  //   return z;
  // };

  return (
    <>
      <Button
        sx={{
          width: "24px",
          height: "24px",
        }}
        onClick={() => slideLeft("top-day-sellings-slider")}
      >
        <img src={leftArrow} alt="" style={{ height: "24px", width: "24px" }} />
      </Button>
      <div id="top-day-sellings-slider" className="top-day-sellings-slider">
        {orders
          // .filter(({ order }) => order === items.description)
          .sort((a, b) => b.count - a.count)
          .map((order, index) => {
            return (
              <div className="top-sellings-item-container" key={index}>
                <div className="top-sellings-item-content-container">
                  <div className="top-sellings-item-pic">
                    {/* <img
                      src={`http://localhost:8000/images/${order.img}`}
                      width="90%"
                      height="100%"
                    /> */}
                    <img
                      src={getImg(order.product)}
                      style={{
                        width: "90%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div className="top-sellings-item-name">
                    <div>{order.product}</div>
                    <div>{getValue(order.product) + " PLN"}</div>
                  </div>
                  <div className="top-sellings-item-quantity-box">
                    Ordered {order.count}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Button
        sx={{
          width: "24px",
          height: "24px",
        }}
        onClick={() => slideRight("top-day-sellings-slider")}
      >
        <img
          src={rightArrow}
          alt=""
          style={{ height: "24px", width: "24px" }}
        />
      </Button>
    </>
  );
};
export default TopSellingsItem;
