import "./NotAvailable.css";
import NotAvailableItem from "./NotAvailableItem";

const NotAvailable = () => {
  return (
    <>
      <div className="not-available-container">
        <div className="subtitle">Currently not available</div>
        <div className="not-available-item-box">
          <NotAvailableItem />
        </div>
      </div>
    </>
  );
};
export default NotAvailable;
