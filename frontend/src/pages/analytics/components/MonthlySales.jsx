import "./DailySales.css";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import MonthlySalesLineChart from "../../../components/charts/MonthlySalesLineChart";
import LoadingData from "../../../components/LoadingData";

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

const MonthlySales = () => {
  const [incomePerHours, setIncomePerHours] = useState([]);
  const [monthlyCounter, setMonthlyCounter] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/analytics/monthlySales", {})
      .then((response) => {
        setIncomePerHours(response.data);
      });

    axios
      .get("http://localhost:8000/analytics/monthlyCategoryCounter", {})
      .then((response) => {
        setMonthlyCounter(response.data);
      });
  }, []);

  return (
    <>
      <div className="daily-sales-main-container">
        <div className="daily-sales-left-box-content">
          <div className="daily-sales-box-title">Monthly sales</div>
          <div style={{ width: "100%", height: "90%" }}>
            {incomePerHours.length !== 0 ? (
              <MonthlySalesLineChart income={incomePerHours} />
            ) : (
              <LoadingData />
            )}
          </div>
        </div>
        <div className="daily-sales-right-box-content">
          <div className="daily-sales-box-title">Monthly sales by category</div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "90%",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", height: "70%" }}>
              {incomePerHours.length !== 0 ? (
                <CircleChart data={monthlyCounter} />
              ) : (
                <LoadingData />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MonthlySales;
