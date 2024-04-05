import "./DailySales.css";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import MonthlyBarChart from "../../../components/charts/MonthlyBarChart";

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

const TotalMonthlyIncome = () => {
  const [montlyIncome, setMonthlyIncome] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/income/perdayofmonth", {})
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
export default TotalMonthlyIncome;
