import "./Navbar.css";
import dashboardIcon from "../img/dashboard-icon.png";
import menuIcon from "../img/menu-icon.png";
import ordersIcon from "../img/orders-icon.png";
import staffIcon from "../img/staff-icon.png";
import deliveryIcon from "../img/delivery-icon.png";
import analyticsIcon from "../img/analytics-icon.png";
import calendarIcon from "../img/calendar-icon.png";
import settingsIcon from "../img/settings-icon.png";
import logoutIcon from "../img/log-out-icon.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = ({ props }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(props);
  const { userState } = useContext(UserContext);

  return (
    <>
      <div className="main-menu-container">
        <div className="main-menu-container-interior">
          <div className="main-menu-container-title">SavoryServe</div>
          <div className="main-menu-links">
            <div className="main-menu-subtitle">Main Menu</div>
            <div
              // className="main-menu-link"
              className={
                selected === "dashboard"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("dashboard");
                navigate("/home");
              }}
            >
              <img
                src={dashboardIcon}
                alt="Menu Icon"
                width="24"
                height="24"
                loading="lazy"
              />
              Dashboard
            </div>
            <div
              // className="main-menu-link"
              className={
                selected === "menu" ? "main-menu-link active" : "main-menu-link"
              }
              onClick={() => {
                setSelected("menu");
                navigate("/menu");
              }}
            >
              <img src={menuIcon} alt="Menu Icon" width="24" height="24" />
              Menu
            </div>
            <div
              // className="main-menu-link"
              className={
                selected === "orders"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("orders");
                navigate("/orders");
              }}
            >
              <img src={ordersIcon} alt="Menu Icon" width="24" height="24" />
              Orders
            </div>
            <div
              // className="main-menu-link"
              className={
                selected === "staff"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("staff");
                navigate("/staff");
              }}
            >
              <img src={staffIcon} alt="Menu Icon" width="24" height="24" />
              Staff
            </div>
            <div
              // className="main-menu-link"
              className={
                selected === "delivery"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("delivery");
                navigate("/delivery");
              }}
            >
              <img src={deliveryIcon} alt="Menu Icon" width="24" height="24" />
              Delivery
            </div>
            <div
              // className="main-menu-link"
              className={
                selected === "analytics"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("analytics");
                navigate("/analytics");
              }}
            >
              <img src={analyticsIcon} alt="Menu Icon" width="24" height="24" />
              Analytics
            </div>
            <div
              // className="main-menu-link"
              className={
                selected === "calendar"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("calendar");
                navigate("/calendar");
              }}
            >
              <img src={calendarIcon} alt="Menu Icon" width="24" height="24" />
              Calendar
            </div>
          </div>
          <div className="main-menu-lower-links">
            <div
              // className="main-menu-link"
              className={
                selected === "settings"
                  ? "main-menu-link active"
                  : "main-menu-link"
              }
              onClick={() => {
                setSelected("settings");
                navigate("/settings");
              }}
            >
              <img src={settingsIcon} alt="Menu Icon" width="24" height="24" />
              Settings
            </div>
            <div
              className="main-menu-link"
              onClick={() => {
                navigate("/login");
                Cookies.remove("userID");
                Cookies.remove("token");
                Cookies.remove("expiresAt");
                userState.id = "";
                userState.name = "";
                userState.email = "";
              }}
            >
              <img src={logoutIcon} alt="Menu Icon" width="24" height="24" />
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
