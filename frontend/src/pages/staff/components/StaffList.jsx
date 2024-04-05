import StaffRow from "./StaffRow";
import "../../orders/components/OrdersList.css";
import "./StaffList.css"

const StaffList = ({staffFilter}) => {
  return (
    <>
        <div className="orders-list-box">
            <div className="orders-list-box-headline">
                <div className="orders-list-box-headers">Profile</div>
                <div className="orders-list-box-headers">Name</div>
                <div className="orders-list-box-headers">ID No</div>
                <div className="orders-list-box-headers">Branch</div>
                <div className="orders-list-box-headers">Role</div>
                <div className="orders-list-box-headers">Status</div>
            </div>
            <hr />
            <StaffRow activeFilter={staffFilter}/>
        </div>
    </>
  );
}
export default StaffList;
