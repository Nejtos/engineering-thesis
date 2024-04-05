import { useState, useEffect } from "react";
import "./CustomerCollection.css";
import axios from "axios";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";

const CustomerCollection = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/customerCollection", {})
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  const saveChanges = () => {
    axios.post("http://localhost:8000/orders/updateCollectedOrders", {
      updatedOrders: orders,
    });
  };

  const mapInSlices = (array, sliceSize, sliceFunc) => {
    const out = [];
    for (var i = 0; i < array.length; i += sliceSize) {
      const slice = array.slice(i, i + sliceSize);
      out.push(sliceFunc(slice, i));
    }
    return out;
  };

  return (
    <div className="customer-collection-main-container">
      <div className="customer-collection-row">
        {mapInSlices(
          orders.sort(
            ({ id: previousID }, { id: currentID }) => previousID - currentID
          ),
          4,
          (slice) => (
            <div className="customer-collection-rows" key={Math.random()}>
              {slice.map((order) => {
                return (
                  <div className="customer-collection" key={order.id}>
                    <div className="customer-collection-interior">
                      <div className="customer-collection-info">
                        <div><b>Order ID:</b></div>
                        <div>{order.id}</div>
                      </div>
                      {/* <br></br> */}
                      <div className="customer-collection-info">
                        <div><b>Name:</b></div>
                        <div>{order.customer_name}</div>
                      </div>
                      <div className="customer-collection-info">
                        <div><b>Payment:</b></div>
                        <div>{order.payment}</div>
                      </div>
                      <div className="customer-collection-prod-info">
                        <div><b>Ordered products:</b></div>
                        <div>{order.products.join(', ')}</div>
                      </div>
                      <div className="customer-collection-info">
                        <div><b>Status:</b></div>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={order.status}
                              onChange={(e) => {
                                const copy = [...orders];
                                const tmp = orders.find((u) => u.id === order.id);
                                tmp.status = e.target.value;
                                const tmpIndex = orders.findIndex(
                                  (u) => u.id === order.id
                                );
                                copy[tmpIndex] = tmp;
                                setOrders(copy);
                              }}
                            >
                              <MenuItem value="Waiting">Waiting</MenuItem>
                              <MenuItem value="Delivered">Delivered</MenuItem>
                              <MenuItem value="Canceled">Canceled</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
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
    </div>
  );
};
export default CustomerCollection;
