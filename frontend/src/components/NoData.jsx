import "./NoData.css";
import noDataImg from "../img/no-data.png"
import noDataImg64 from "../img/no-data64.png"

const NoData = ({props}) => {
    return (
        <>
            <div className="no-data-main-container">
                <div className="no-data-container-img">{props === "64" ? <img src={noDataImg64} alt="No data" /> : <img src={noDataImg} alt="No data" />}</div>
                <div className="no-data-container-text">No data yet</div>
            </div>
        </>
    )
}
export default NoData;