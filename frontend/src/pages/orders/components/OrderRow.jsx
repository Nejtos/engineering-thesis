import { useState, useEffect } from "react";
import axios from "axios";
import "./OrderRow.css";

const OrderRow = ({ activeFilter }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/orders", {}).then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      {activeFilter === "Ordered"
        ? orders
            .sort(
              ({ id: previousID }, { id: currentID }) => previousID - currentID
            )
            .reverse()
            .map((order, key) => {
              return (
                <div className="order-info-box" key={key}>
                  <div className="customer-name">{order.id}</div>
                  <div className="customer-name">{order.customer_name}</div>
                  <div className="customer-name">{order.payment}</div>
                  <div className="customer-name">{`${order.address[0]} ${order.address[1]}, ${order.address[2]}`}</div>
                  <div className="customer-name">{order.delivery_type}</div>
                  <div className="customer-name">{order.status}</div>
                </div>
              );
            })
        : orders
            .filter(({ status }) => status === activeFilter)
            .sort(
              ({ id: previousID }, { id: currentID }) => previousID - currentID
            )
            .reverse()
            .map((order, key) => {
              return (
                <div className="order-info-box" key={key}>
                  <div className="customer-name">{order.id}</div>
                  <div className="customer-name">{order.customer_name}</div>
                  <div className="customer-name">{order.payment}</div>
                  <div className="customer-name">{order.address}</div>
                  <div className="customer-name">{order.delivery_type}</div>
                  <div className="customer-name">{order.status}</div>
                </div>
              );
            })}
    </>
  );
};
export default OrderRow;
