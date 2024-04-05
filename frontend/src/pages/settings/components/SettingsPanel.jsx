import { Button } from "@mui/material";
import "./SettingsPanel.css";
import ManageMenu from "./ManageMenu";
import ManageStaff from "./ManageStaff";
import PersonalInformation from "./PersonalInformation";
import { useState } from "react";
import { purple } from "@mui/material/colors";

const SettingsPanel = () => {
  const [activeFilter, setActiveFilter] = useState("personal-information");
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
  ];

  return (
    <>
      <div className="settings-panel-main-box">

          <div className="btns-section-filter">
            <Button
              className={activeFilter === "personal-information" ? "selected" : ""}
              variant="outlined"
              // sx={{
              //   width: "20%",
              //   borderRadius: "20px",
              //   height: "52px",
              // }}
              sx={styles[0]}
              onClick={() => setActiveFilter('personal-information')}
            >
              Personal information
            </Button>
            <Button
              className={activeFilter === "manage-menu" ? "selected" : ""}
              variant="outlined"
              // sx={{
              //   width: "20%",
              //   borderRadius: "20px",
              //   height: "52px",
              // }}
              sx={styles[0]}
              onClick={() => setActiveFilter('manage-menu')}
            >
              Manage menu
            </Button>
            <Button
              className={activeFilter === "manage-staff" ? "selected" : ""}
              variant="outlined"
              // sx={{
              //   width: "20%",
              //   borderRadius: "20px",
              //   height: "52px",
              // }}
              sx={styles[0]}
              onClick={() => setActiveFilter('manage-staff')}
            >
              Manage staff
            </Button>
          </div>
          {activeFilter === "personal-information" ? <PersonalInformation /> : null}
          {activeFilter === "manage-menu" ? <ManageMenu/> : null}
          {activeFilter === "manage-staff" ? <ManageStaff/> : null}
        </div>

    </>
  );
};
export default SettingsPanel;
