import "./LoadingData.css";
import LoadingDataImg from "../img/loading.png"

const LoadingData = () => {
    return (
        <>
            <div className="loading-data-main-container">
                <div className="loading-data-container-img"><img src={LoadingDataImg} alt="Loading data" /></div>
            </div>
        </>
    )
}
export default LoadingData;