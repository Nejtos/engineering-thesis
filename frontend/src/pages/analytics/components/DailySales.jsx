import "./DailySales.css";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import NoData from "../../../components/NoData";

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

const DailySales = () => {
  const [incomePerHours, setIncomePerHours] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
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
      <div className="daily-sales-main-container">
        <div className="daily-sales-left-box-content">
          <div className="daily-sales-box-title">Daily Sales</div>
          <div style={{ width: "100%", height: "90%" }}>
          {values.length !== 0 ? <LineChart income={incomePerHours} /> : <NoData />}
          </div>
        </div>
        <div className="daily-sales-right-box-content">
          <div className="daily-sales-box-title">Daily sales by category</div>
          <div style={{ display: "flex", width: "100%", height: "90%", alignItems: "center" }}>
            <div style={{ width: "100%", height: "70%" }}>
              {values.length !== 0 ? <CircleChart data={values} /> : <NoData />}  
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DailySales;
