import "./UserInitial.css";
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";


const UserInitial = () => {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <>
        <div className="user-initial-btn-box">
            <div className="user-initial-btns">
              <div className="user-initial-btn" onClick={ () => {navigate("/order-panel")}}>
                <PersonIcon fontSize="large"/>
                User
              </div>
              <div className="user-initial-btn" onClick={handleClick}>
                <ManageAccountsIcon fontSize="large"/>
                Worker
              </div>
            </div>
        </div>
    </>
  );
}
export default UserInitial;
