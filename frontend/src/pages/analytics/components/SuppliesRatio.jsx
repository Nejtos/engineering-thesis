import "./DailySales.css";
import CircleChart from "../../../components/charts/CircleChart";
import LineChart from "../../../components/charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";
import SuppliesBarChart from "../../../components/charts/SuppliesRatioBarChart";

const SuppliesRatio = () => {
  const [montlyIncome, setMonthlyIncome] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/analytics/suppliesRatio", {})
      .then((response) => {
        setMonthlyIncome(response.data);
      });
  }, []);
  
  return (
    <>
        <SuppliesBarChart data={montlyIncome} />
    </>
  );
};
export default SuppliesRatio;
