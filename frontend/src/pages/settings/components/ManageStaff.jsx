import { useState, useEffect } from "react";
import "./ManageStaff.css";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";
import defaultUser from "../../../img/default-user.png";

const ManageStaff = () => {
  const [users, setUsers] = useState([]);
  // const [arr, setArr] = useState({name: "", status: ""});

  useEffect(() => {
    axios.get("http://localhost:8000/users", {}).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const saveChanges = () => {
    axios.post("http://localhost:8000/users/update", {
      updatedUsers: users,
    });
    // .then(() => {
    //     console.log("Updates users info send");
    // })
    // .catch((error) => {
    //     console.log(error.response.data);
    // });
  };

  return (
    <>
      <div className="settings-panel-main-content">
        <div className="settings-panel-content-section">
          {users.map((user, key) => {
            return (
              <div className="settings-info-box" key={key}>
                <div className="customer-name">
                <img src={user.userAvatar ? `http://localhost:8000/images/${user.userAvatar}` : defaultUser} width="70px" height="60px" />
                {/* <img src={`http://localhost:8000/images/${user.userAvatar}`} width="70px" height="60px" /> */}
                </div>
                <div className="customer-name">{user.name}</div>
                <div className="customer-name">{user.role}</div>
                <div className="customer-name">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Info
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.status}
                        label="info"
                        onChange={(e) => {
                          const copy = [...users];
                          const tmp = users.find((u) => u.id === user.id);
                          tmp.status = e.target.value;
                          const tmpIndex = users.findIndex(
                            (u) => u.id === user.id
                          );
                          copy[tmpIndex] = tmp;
                          setUsers(copy);
                        }}
                      >
                        <MenuItem value="On">On</MenuItem>
                        <MenuItem value="Off">Off</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                {user.status === "Off" ? 
                <div className="customer-name">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Absence reason
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.absenceReason === null ? "" : user.absenceReason}
                        label="Absence reason"
                        onChange={(e) => {
                          const copy = [...users];
                          const tmp = users.find((u) => u.id === user.id);
                          tmp.absenceReason = e.target.value;
                          const tmpIndex = users.findIndex(
                            (u) => u.id === user.id
                          );
                          copy[tmpIndex] = tmp;
                          setUsers(copy);
                        }}
                      >
                        <MenuItem value="Sick leave">Sick leave</MenuItem>
                        <MenuItem value="Annual leave">Annual leave</MenuItem>
                        <MenuItem value="Business trip">Business trip</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                : user.absenceReason = "" }
              </div>
            );
          })}
        </div>
      </div>
      <div className="save-btn">
        <Button
          variant="contained"
          sx={{
            width: "12%",
            borderRadius: "20px",
            height: "32px",
            backgroundColor: green[600],
            "&:hover": {
              backgroundColor: green[700],
              borderColor: green[700],
              color: "white",
            },
            "&.selected": {
              backgroundColor: green[600],
              borderColor: green[600],
              color: "white",
            },
            borderColor: green[600],
            color: "white",
          }}
          onClick={saveChanges}
        >
          Save
        </Button>
      </div>
    </>
  );
};
export default ManageStaff;
