import "../Pages.css";
import Navbar from "../../components/Navbar";
// import Button from "../components/Button";
import StaffList from "./components/StaffList";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { purple, green, pink } from "@mui/material/colors";
import { useState } from "react";

const StaffPage = () => {
  const [staffFilter, setStaffFilter] = useState("All");
  const styles = [
    {
      width: "20%",
      borderRadius: "16px",
      height: "52px",
      // backgroundColor: purple[400],
      "&:hover": {
        backgroundColor: purple[400],
        borderColor: purple[400],
        color: "white",
      },
      "&.selected": {
        backgroundColor: purple[400],
        borderColor: purple[400],
        color: "white",
      },
      borderColor: purple[400],
      color: purple[500],
    },
    {
      width: "20%",
      borderRadius: "20px",
      height: "52px",
      backgroundColor: green[700],
      "&:hover": {
        backgroundColor: green[800],
      },
    },
    {
      width: "20%",
      borderRadius: "20px",
      height: "52px",
      backgroundColor: pink[400],
      "&:hover": {
        backgroundColor: pink[500],
      },
    },
  ];

  return (
    <div className="App">
      <div className="orders-page-grid">
        <Navbar props="staff" />
        <Header />
        <div className="order-page-main-content-grid">
          <div className="orders-page-btns">
            <Button
              className={staffFilter === "All" ? "selected" : ""}
              variant="outlined"
              sx={styles[0]}
              onClick={() => setStaffFilter("All")}
            >
              All Employees
            </Button>
            <Button
              className={staffFilter === "Sick leave" ? "selected" : ""}
              variant="outlined"
              sx={styles[0]}
              onClick={() => setStaffFilter("Sick leave")}
            >
              Sick leave
            </Button>
            <Button
              className={staffFilter === "Annual leave" ? "selected" : ""}
              variant="outlined"
              sx={styles[0]}
              onClick={() => setStaffFilter("Annual leave")}
            >
              Annual Leave
            </Button>
            <Button
              className={staffFilter === "Business trip" ? "selected" : ""}
              variant="outlined"
              sx={styles[0]}
              onClick={() => setStaffFilter("Business trip")}
            >
              Business Trip
            </Button>
            {/* <Button
              content={"All Employees"}
              id={"ordered"}
              clickEvent={() => console.log("Click")}
            />
            */}
          </div>

          <StaffList staffFilter={staffFilter} />
        </div>
      </div>
    </div>
  );
};
export default StaffPage;
