import "./PromotionsItem.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { slideLeft } from "../../../util/slideLeft";
import { slideRight } from "../../../util/slideRight";
import leftArrow from "../../../img/left-arrow.png";
import rightArrow from "../../../img/right-arrow.png";
import { Button } from "@mui/material";

const PromotionsItem = () => {
  const [promotionItems, setPromotionItems] = useState([]);
  const [x, setX] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/data/promotions", {}).then((response) => {
      setPromotionItems(response.data);
    });

    axios
      .get("http://localhost:8000/orders/menu/orderedCounter", {})
      .then((response) => {
        setX(response.data);
      });
  }, []);

  const getValue = (y) => {
    let z = 0;
    x.forEach((element) => {
      element.product === y ? (z = element.count) : null;
    });
    return z;
  };

  return (
    <>
      <Button
        sx={{
          width: "24px",
          height: "24px",
        }}
        onClick={() => slideLeft("promotions-slider")}
      >
        <img src={leftArrow} alt="" style={{ height: "24px", width: "24px" }} />
      </Button>
      <div id="promotions-slider" className="promotions-slider">
        {promotionItems.map((promotionItem, key) => {
          return (
            <div className="promotions-item-container" key={key}>
              <div className="promotions-item-content-container">
                <div className="promotions-item-pic">
                  <img
                    src={`http://localhost:8000/images/${promotionItem.img}`}
                    width="200px"
                    height="200px"
                  />
                </div>
                <div className="promotions-item-name">
                  <div>{promotionItem.description}</div>
                  <div>{promotionItem.price + " PLN"}</div>
                </div>
                <div className="promotions-item-quantity-box">
                  Ordered {getValue(promotionItem.description)}
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
        onClick={() => slideRight("promotions-slider")}
      >
        <img src={rightArrow} style={{ height: "24px", width: "24px" }} />
      </Button>
    </>
  );
};
export default PromotionsItem;
