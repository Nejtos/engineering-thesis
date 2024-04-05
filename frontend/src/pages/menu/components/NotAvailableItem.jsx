import "./NotAvailableItem.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { slideLeft } from "../../../util/slideLeft";
import { slideRight } from "../../../util/slideRight";
import leftArrow from "../../../img/left-arrow.png";
import rightArrow from "../../../img/right-arrow.png";
import { Button } from "@mui/material";

const NotAvailableItem = () => {
  const [notAvailable, setNotAvailable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/data/notAvailable", {})
      .then((response) => {
        setNotAvailable(response.data);
      });
  }, []);

  return (
    <>
      <Button
        sx={{
          width: "24px",
          height: "24px",
        }}
        onClick={() => slideLeft("not-available-slider")}
      >
        <img src={leftArrow} alt="" style={{ height: "24px", width: "24px" }} />
      </Button>
      <div id="not-available-slider" className="not-available-slider">
        {notAvailable.map((item, key) => {
          return (
            <div className="not-available-item-container" key={key}>
              <div className="not-available-item-content-container">
                <div className="not-available-item-pic">
                  <img src={`http://localhost:8000/images/${item.img}`} width="200px" height="200px" />
                </div>
                <div className="not-available-item-name">
                  <div>{item.description}</div>
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
        onClick={() => slideRight("not-available-slider")}
      >
        <img
          src={rightArrow}
          style={{ height: "24px", width: "24px" }}
        />
      </Button>
    </>
  );
};
export default NotAvailableItem;
