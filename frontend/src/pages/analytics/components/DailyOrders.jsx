import "./DailySales.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DailyOrdersBarChart from "../../../components/charts/DailyOrdersBarChart";

const DailyOrders = () => {
  const [montlyIncome, setMonthlyIncome] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/analytics/dailyOrders", {})
      .then((response) => {
        setMonthlyIncome(response.data);
      });
  }, []);

  return (
    <>
      <DailyOrdersBarChart data={montlyIncome} />
    </>
  );
};
export default DailyOrders;
