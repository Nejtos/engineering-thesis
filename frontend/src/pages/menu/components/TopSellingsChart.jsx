import CircleChart from "../../../components/charts/CircleChart.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { items } from "../../order-panel/components/Data.jsx";
import "./TopSellingsChart.css";

const TopSellingsChart = () => {
  const [orders, setOrders] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/menu/orderedCounter", {})
      .then((response) => {
        setOrders(response.data);
      });

    axios
      .get("http://localhost:8000/orders/menu/byCategoryCounter", {})
      .then((response) => {
        setValues(response.data);
      });
  }, []);

  // const valueChart = (x) => {
  //   items.forEach((element) => {
  //     element.description === x.product
  //       ? arr.push({ category: element.category, amount: x.count })
  //       : null;
  //   });
  //   const count = Array.from(
  //     arr.reduce(
  //       (r, c) => r.set(c.category, (r.get(c.category) || 0) + c.amount),
  //       new Map()
  //     ),
  //     ([id, value]) => ({ id, value })
  //   );
  //   console.log(count);
  //   setA(count)
  //   arr1.push(count);
  //   return count;
  // };

  return (
    <>
      <div className="top-sellings-chart-container">
        <div className="subtitle">Top Sellings of the day</div>
        <div className="top-sellings-chart-main">
          <CircleChart data={values}/>
        </div>
      </div>
    </>
  );
};
export default TopSellingsChart;
