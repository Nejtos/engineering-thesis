import "./DailySales.css";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import MonthlySalesLineChart from "../../../components/charts/MonthlySalesLineChart";
import AnnualSalesLineChart from "../../../components/charts/AnnualSalesLineChart";
import NoData from "../../../components/NoData";
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

const AnnualSales = () => {
  const [annualSales, setAnnualSales] = useState([]);
  const [annualCounter, setAnnualCounter] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/analytics/annualSales", {})
      .then((response) => {
        setAnnualSales(response.data);
      });

    axios
      .get("http://localhost:8000/analytics/annualCategoryCounter", {})
      .then((response) => {
        setAnnualCounter(response.data);
      });
  }, []);

  return (
    <>
      <div className="daily-sales-main-container">
        <div className="daily-sales-left-box-content">
          <div className="daily-sales-box-title">Annual Sales</div>
          <div style={{ width: "100%", height: "90%" }}>
            {annualSales.length !== 0 ? (
            <AnnualSalesLineChart income={annualSales} />
            ) : (<LoadingData />)}
          </div>
        </div>
        <div className="daily-sales-right-box-content">
          <div className="daily-sales-box-title">Annual sales by category</div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "90%",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", height: "70%" }}>
              {annualCounter.length !== 0 ? (
                <CircleChart data={annualCounter} />
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
export default AnnualSales;
