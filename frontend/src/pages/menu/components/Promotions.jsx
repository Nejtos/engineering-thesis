import "./Promotions.css";
import PromotionsItem from "./PromotionsItem";

const Promotions = () => {
  return (
    <>
      <div className="promotions-container">
        <div className="subtitle">Todays Promotions</div>
        <div className="promotions-item-box">
          <PromotionsItem />
        </div>
      </div>
    </>
  );
};
export default Promotions;
