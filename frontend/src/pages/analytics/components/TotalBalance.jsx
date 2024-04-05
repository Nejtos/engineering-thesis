import "./DailySales.css";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import MonthlyBarChart from "../../../components/charts/MonthlyBarChart";

const TotalBalance = () => {
  const [montlyIncome, setMonthlyIncome] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/analytics/totalBalance", {})
      .then((response) => {
        setMonthlyIncome(response.data);
      });
  }, []);

  return (
    <>
        <MonthlyBarChart data={montlyIncome} />
    </>
  );
};
export default TotalBalance;
