import "./DailySales.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DailyOrdersBarChart from "../../../components/charts/DailyOrdersBarChart";

const TopSellings = () => {
  const [topSellingsData, setTopSellingsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/analytics/topSellings", {})
      .then((response) => {
        setTopSellingsData(response.data);
      });
  }, []);

  return (
    <>
      <DailyOrdersBarChart data={topSellingsData.sort((a, b) => parseFloat(b.Quantity) - parseFloat(a.Quantity))} />
    </>
  );
};
export default TopSellings;
