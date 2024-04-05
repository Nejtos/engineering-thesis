import "./Dashboard.css";
import PaymentCard from "./PaymentCard";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import BarChart from "../../../components/charts/BarChart";
import HorizontalBarChart from "../../../components/charts/HorizontalBarChart";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";
import DailyHorizontalBarChart from "../../../components/charts/DailyHorizontalBarChart";

const data = [
  {
    id: "Drink",
    label: "Drink",
    value: 461,
    color: "hsl(185, 70%, 50%)",
  },
  {
    id: "Food",
    label: "Food",
    value: 247,
    color: "hsl(156, 70%, 50%)",
  },
  {
    id: "Other",
    label: "Other",
    value: 568,
    color: "hsl(359, 70%, 50%)",
  },
];

const Menu = () => {
  const [income, setIncome] = useState([]);
  const [incomePerDay, setIncomePerDay] = useState([]);
  const [incomePerHours, setIncomePerHours] = useState([]);
  const [dailyIncome, setDailyIncome] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/orders/income", {}).then((response) => {
      setIncome(response.data);
    });

    axios
      .get("http://localhost:8000/orders/income/daily", {})
      .then((response) => {
        setDailyIncome(response.data);
      });

    axios
      .get("http://localhost:8000/orders/income/perday", {})
      .then((response) => {
        setIncomePerDay(response.data);
      });

    axios
      .get("http://localhost:8000/orders/income/perhours", {})
      .then((response) => {
        setIncomePerHours(response.data);
      });

    axios
      .get("http://localhost:8000/orders/menu/byCategoryCounter", {})
      .then((response) => {
        setValues(response.data);
      });
  }, []);

  return (
    <>
      <div className="dashboard-grid">
        <Navbar props="dashboard" />
        <Header />
        <div className="home-div3">
          <div className="main-stats-box">
            <div style={{ width: "100%" }}>
              {incomePerDay.length !== 0 ? <BarChart incomePerDay={incomePerDay} /> : <NoData props={"64"} />}
            </div>
          </div>
          <div className="daily-monthly-stats-box">
            <div style={{ width: "100%", height: "50%" }}>
              {dailyIncome.length !== 0 ? <DailyHorizontalBarChart income={dailyIncome} /> : <NoData props={"64"} />}
            </div>
            <div style={{ width: "100%", height: "50%" }}>
              <HorizontalBarChart income={income} />
            </div>
          </div>
          <div className="daily-info-stats-box">
            <div style={{ width: "35%" }}>
              {incomePerHours.length !== 0 ? <LineChart income={incomePerHours} /> : <NoData props={"64"} />} 
            </div>
            <div style={{ width: "34%" }}>
              {values.length !== 0 ? <CircleChart data={values} /> : <NoData props={"64"} />} 
            </div>
            <PaymentCard />
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;
