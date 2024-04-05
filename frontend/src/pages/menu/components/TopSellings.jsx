import "./TopSellings.css"
import TopSellingsItem from "./TopSellingsItem";

const TopSellings = () => {
    return (
        <>
            <div className="top-sellings-container">
                <div className="subtitle">Top Sellings of the day</div>
                <div className="top-sellings-item-box">
                    <TopSellingsItem />
                </div>
            </div>
        </>
    )
}
export default TopSellings;