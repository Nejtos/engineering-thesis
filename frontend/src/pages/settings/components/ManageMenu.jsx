import { useState, useEffect } from "react";
import "./ManageMenu.css";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";
// import {items} from "./user-order-panel/Data"

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  // const [arr, setArr] = useState({name: "", status: ""});

  useEffect(() => {
    axios.get("http://localhost:8000/data", {}).then((response) => {
      setItems(response.data);
    });
  }, []);

  const saveChanges = () => {
    axios.post("http://localhost:8000/data/update", {
      updatedData: items,
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
          {items
            .sort(
              ({ id: previousID }, { id: currentID }) => previousID - currentID
            )
            .map((item, key) => {
              return (
                <div className="settings-info-box" key={key}>
                  <div className="customer-name">
                    <img
                      src={`http://localhost:8000/images/${item.img}`}
                      width="70px"
                      height="60px"
                    />
                  </div>
                  <div className="customer-name">{item.description}</div>
                  <div className="customer-name">{item.price + " PLN"}</div>
                  <div className="customer-name">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.status}
                          label="status"
                          onChange={(e) => {
                            const copy = [...items];
                            const tmp = items.find((u) => u.id === item.id);
                            tmp.status = e.target.value;
                            const tmpIndex = items.findIndex(
                              (u) => u.id === item.id
                            );
                            copy[tmpIndex] = tmp;
                            setItems(copy);
                            console.log(tmp, copy);

                            // item.status = e.target.value;
                            // changeStatus(item.status);
                          }}
                        >
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Promotion">Promotion</MenuItem>
                          <MenuItem value="Not available">
                            Not available
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="customer-name">
                    {/* <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "150px" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="New price"
                  variant="standard"
                  defaultValue={item.price}
                  onChange={(e) => {item.price = e.target.value; console.log(item)}}
                />
              </Box> */}
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          New price
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.price}
                          label="new price"
                          onChange={(e) => {
                            const copy = [...items];
                            const tmp = items.find((u) => u.id === item.id);
                            tmp.price = e.target.value;
                            const tmpIndex = items.findIndex(
                              (u) => u.id === item.id
                            );
                            copy[tmpIndex] = tmp;
                            setItems(copy);
                            console.log(tmp, copy);

                            // item.price = e.target.value;
                            // changePrice(item.price);
                          }}
                        >
                          <MenuItem value={item.defaultPrice}>
                            Normal price
                          </MenuItem>
                          <MenuItem
                            value={(item.defaultPrice * 0.95).toFixed(2)}
                          >
                            5% off
                          </MenuItem>
                          <MenuItem
                            value={(item.defaultPrice * 0.9).toFixed(2)}
                          >
                            10% off
                          </MenuItem>
                          <MenuItem
                            value={(item.defaultPrice * 0.85).toFixed(2)}
                          >
                            15% off
                          </MenuItem>
                          <MenuItem
                            value={(item.defaultPrice * 0.8).toFixed(2)}
                          >
                            20% off
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
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
export default ManageMenu;
