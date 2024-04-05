import "./PaymentCard.css";
import { UserContext } from "../../../context/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentCard = () => {
  const { userState } = useContext(UserContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/getUser", {
        headers: {
          userID: Cookies.get("userID"),
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  return (
    <>
      <div className="ext-border-card">
        <div className="interior-card">
          <div className="card-name">VISA</div>
          <div className="card-info">
            <div className="money-amount">254.86 $</div>
            {/* <div className="card-number">{userState.cardNum}</div>
            <div className="expired-date">{userState.cardExpirationDate}</div> */}
            <div className="card-number">{user.cardNum || ""}</div>
            <div className="expired-date">{user.cardExpirationDate || ""}</div>
            <div className="card-owner">{userState.name}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentCard;
