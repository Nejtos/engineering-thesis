import "./DriverBox.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { slideLeft } from "../../../util/slideLeft";
import { slideRight } from "../../../util/slideRight";
import leftArrow from "../../../img/left-arrow.png";
import rightArrow from "../../../img/right-arrow.png";
import { Button } from "@mui/material";
import defaultUser from "../../../img/default-user.png";

const DriverBox = () => {
  const [deliverers, setDeliverers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/delivery", {}).then((response) => {
      setDeliverers(response.data);
    });
  }, []);

  return (
    <div className="driver-box-main-container">
      <Button
        sx={{
          width: "24px",
          height: "24px",
        }}
        onClick={() => slideLeft("drivers-slider")}
      >
        <img src={leftArrow} alt="" style={{ height: "24px", width: "24px" }} />
      </Button>
      <div className="drivers-slider">
        {deliverers.map((deliverer, index) => {
          return (
            <div className="driver-box" key={index}>
              <div className="driver-box-interior">
                <div className="driver-box-info">
                  <div><img src={deliverer.userAvatar ? `http://localhost:8000/images/${deliverer.userAvatar}` : defaultUser} width="20px" height="20px" /></div>
                  <div>{deliverer.status}</div>
                </div>
                {/* <br></br> */}
                <div className="driver-box-info">
                  <div>Name:</div>
                  <div>{deliverer.name}</div>
                </div>
                <div className="driver-box-info">
                  <div>Email:</div>
                  <div>{deliverer.email}</div>
                </div>
                <div className="driver-box-info">
                  <div>Number:</div>
                  <div>{deliverer.phoneNum}</div>
                </div>
                <div className="driver-box-info">Finished orders: </div>
                <div className="driver-box-info">Attached orders:</div>
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
        onClick={() => slideRight("drivers-slider")}
      >
        <img
          src={rightArrow}
          alt=""
          style={{ height: "24px", width: "24px" }}
        />
      </Button>
      {/* <div className="driver-box-interior">
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Prof pic</div>
                  <div className="driver-box-info-right">
                    {deliverer.status}
                  </div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">XXXXXX</div>
                  <div className="driver-box-info-right">111111</div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Name</div>
                  <div className="driver-box-info-right">{deliverer.name}</div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Number</div>
                  <div className="driver-box-info-right">111111</div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Email</div>
                  <div className="driver-box-info-right">{deliverer.email}</div>
                </div>
                <div className="driver-box-info">Finished deliverers</div>
                <div className="driver-box-info">Attached deliverers</div>
              </div> */}
      {/* <Button
        sx={{
          width: "24px",
          height: "24px",
        }}
        onClick={slideLeft}
      >
        <img src={leftArrow} alt="" style={{ height: "24px", width: "24px" }} />
      </Button>
      <div id="drivers-slider" className="drivers-slider">
        {deliverers.map((deliverer, key) => {
          return (
            <div className="driver-box" key={key}>
              <div className="driver-box-interior">
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Prof pic</div>
                  <div className="driver-box-info-right">
                    {deliverer.status}
                  </div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">XXXXXX</div>
                  <div className="driver-box-info-right">111111</div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Name</div>
                  <div className="driver-box-info-right">{deliverer.name}</div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Number</div>
                  <div className="driver-box-info-right">111111</div>
                </div>
                <div className="driver-box-info">
                  <div className="driver-box-info-left">Email</div>
                  <div className="driver-box-info-right">{deliverer.email}</div>
                </div>
                <div className="driver-box-info">Finished deliverers</div>
                <div className="driver-box-info">Attached deliverers</div>
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
        onClick={slideRight}
      >
        <img
          src={rightArrow}
          alt=""
          style={{ height: "24px", width: "24px" }}
        />
      </Button> */}
    </div>
  );
};
export default DriverBox;
