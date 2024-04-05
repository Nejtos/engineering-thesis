import { useEffect, useState } from "react";
import axios from "axios";
import "../../orders/components/OrderRow.css";
import defaultUser from "../../../img/default-user.png";

const StaffRow = ({ activeFilter }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users", {}).then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <>
      {activeFilter === "All"
        ? users.map((user, key) => {
            return (
              <div className="order-info-box" key={key}>
                <div className="customer-name"><img src={user.userAvatar ? `http://localhost:8000/images/${user.userAvatar}` : defaultUser} width="50px" height="50px" /></div>
                <div className="customer-name">{user.name}</div>
                <div className="customer-name">{user.id}</div>
                <div className="customer-name">{user.branch}</div>
                <div className="customer-name">{user.role}</div>
                <div className="customer-name">{user.status}</div>
              </div>
            );
          })
        : users
            .filter(({ absenceReason }) => absenceReason === activeFilter)
            .map((user, key) => {
              return (
                <div className="order-info-box" key={key}>
                  <div className="customer-name"><img src={user.userAvatar ? `http://localhost:8000/images/${user.userAvatar}` : defaultUser} width="50px" height="50px" /></div>
                  <div className="customer-name">{user.name}</div>
                  <div className="customer-name">{user.id}</div>
                  <div className="customer-name">{user.branch}</div>
                  <div className="customer-name">{user.role}</div>
                  <div className="customer-name">{user.status}</div>
                </div>
              );
            })}
    </>
  );
};
export default StaffRow;
