import OrderRow from "./OrderRow";
import "./OrdersList.css";

const OrdersList = ({ orderFilter }) => {
  return (
    <>
      <div className="orders-list-box">
        <div className="orders-list-box-headline">
          <div className="orders-list-box-headers">ID</div>
          <div className="orders-list-box-headers">Customer Name</div>
          <div className="orders-list-box-headers">Payment</div>
          <div className="orders-list-box-headers">Address</div>
          <div className="orders-list-box-headers">Deliver Type</div>
          <div className="orders-list-box-headers">Status</div>
        </div>
        <hr />
        <OrderRow activeFilter={orderFilter} />
      </div>
    </>
  );
};
export default OrdersList;
