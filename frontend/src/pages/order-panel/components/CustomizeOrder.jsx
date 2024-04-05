import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import AnotherButton from "../../../components/Button.jsx";
import "./CustomizeOrder.css";
// import { items } from "./Data";
import { toast } from "react-toastify";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { CartContext } from "../../../context/CartContex.jsx";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { FormControl } from "@mui/material";
import OrderFinalisation from "./OrderFinalisation";
import axios from "axios";

function CustomizeOrder({ active }) {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([]);

  const addingNotify = () =>
    toast.success("Item(s) has been added to the cart!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const warningNotify = () =>
    toast.warning("The shopping cart is empty!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const anotherWarningNotify = () =>
    toast.warning("You must first select the quantity!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { cartItems, addToCart, updateCartItemCounter } =
    useContext(CartContext);

  const addProduct = () => {
    counter === 0
      ? anotherWarningNotify()
      : (addingNotify(),
        document
          .querySelector(".customize-order-container")
          .classList.remove("active"));
  };

  const addToCounter = () => {
    items
      .filter(({ id }) => id === active)
      .map((product) => {
        cartItems[product.id] === 0
          ? setCounter(counter + 1)
          : updateCartItemCounter(product.id, counter + 1);
      });
  };

  const subToCounter = () => {
    items
      .filter(({ id }) => id === active)
      .map((product) => {
        cartItems[product.id] === 0
          ? counter - 1 > 0
            ? setCounter(counter - 1)
            : setCounter(0)
          : updateCartItemCounter(product.id, counter - 1);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/data/", {}).then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    items
      .filter(({ id }) => id === active)
      .map((product) => {
        setCounter(cartItems[product.id]);
      });
  }, [cartItems, active]);

  return (
    <>
      <div className="customize-order-container">
        <div className="customize-order-container-header">
          <ClearOutlinedIcon
            style={{ fontSize: 32, cursor: "pointer" }}
            onClick={() => {
              document
                .querySelector(".customize-order-container")
                .classList.remove("active");
            }}
          />
        </div>
        {items
          .filter(({ id }) => id === active)
          .map((product, index) => {
            return (
              <div className="customize-order-inner-container" key={index}>
                <div className="customize-order-product-title">
                  {product.description}
                </div>
                {product.details}
                <hr />
                <div className="customize-order-product-details">
                  <div>Size:</div>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue="medium"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    >
                      <FormControlLabel
                        value="medium"
                        control={<Radio />}
                        label={product.size[0]}
                      />
                      <FormControlLabel
                        value="large"
                        control={<Radio />}
                        label={product.size[1]}
                      />
                    </RadioGroup>
                  </FormControl>
                  <div>Drinks:</div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Watter 0.5l"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          console.log(
                            "Checkbox is checked - boolean value: ",
                            e.target.checked
                          );
                        }
                        if (e.target.checked === false) {
                          console.log(
                            "Checkbox is not checked - boolean value: ",
                            e.target.checked
                          );
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Coca-cola 0.5l"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Sprite 0.5l"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Tea"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                  </FormGroup>
                </div>
                <hr />
                <div className="customize-order-quantity-buttons">
                  <Button buttonContent="-" clickEffect={subToCounter} />
                  <div
                    className="customize-order-quantity-counter"
                    value={counter}
                  >
                    {cartItems[product.id] === 0
                      ? counter
                      : cartItems[product.id]}
                  </div>
                  <Button buttonContent="+" clickEffect={addToCounter} />
                </div>
                <hr />
                <div className="customize-order-quantity-extra-buttons">
                  <AnotherButton
                    id="addToCart"
                    content={
                      "ADD TO CART" +
                      " " +
                      "( " +
                      (product.price * counter).toFixed(2) +
                      " PLN )"
                    }
                    clickEvent={() => {
                      addToCart(
                        product.id,
                        document
                          .querySelector(".customize-order-quantity-counter")
                          .getAttribute("value")
                      );
                      addProduct();
                    }}
                  />
                  {/* <Button
                    buttonContent="ADD TO CART"
                    clickEffect={() => {
                      addToCart(
                        product.id,
                        document
                          .querySelector(".quantity-counter")
                          .getAttribute("value")
                      );
                      addProduct();
                    }}
                  /> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default CustomizeOrder;
