import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import AnotherButton from "../../../components/Button.jsx";
import "./OrderFinalisation.css";
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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
  nameValidator,
  phoneNumValidator,
  emailValidator,
  streetValidator,
} from "./UserFormValidation";

function OrderFinalisation({ products, quantity, category, amount }) {
  const { cartItems } = useContext(CartContext);
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNr, setCustomerPhoneNr] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerStreet, setCustomerStreet] = useState("");
  const [customerHomeNr, setCustomerHomeNr] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAdress, setCustomerAdress] = useState([]);
  const [items, setItems] = useState([]);

  const checkoutNotify = () =>
    toast.info("Thank you for shopping in our store!", {
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

  const cartValue = () => {
    let totalPrice = 0;
    let amount = 0;
    for (let i = 1; i < items.length + 1; i++) {
      let data = items[i - 1];
      if (cartItems[i] !== 0) {
        amount = cartItems[i];
        totalPrice += amount * data.price;
      }
    }
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/data/", {})
    .then((response) => {
      setItems(response.data.sort((a, b) => (a.id) - (b.id)));
    });
  }, []);

  useEffect(() => {
    let arr = [];
    arr.push(customerStreet);
    arr.push(customerHomeNr);
    arr.push(customerCity);
    setCustomerAdress(arr);
  }, [customerAdress]);

  const removeCart = () => {
    let size = 0;
    for (let i = 1; i < items.length + 1; i++) {
      if (cartItems[i] !== 0) {
        size += 1;
      }
    }
    size !== 0 && emailValidator(customerEmail).eState !== true
      ? axios
          .post("http://localhost:8000/orders/create", {
            customer_name: customerName,
            payment: paymentMethod,
            address: customerAdress,
            delivery_type: deliveryType,
            status: '',
            products: products,
            category: category,
            quantity: quantity,
            amount: amount,
          })
          .then(function (response) {
            console.log(response);
            checkoutNotify()
            // sessionStorage.removeItem("cart")
            // setTimeout(() => window.location.reload(), 3000);
          })
      : // (
        // checkoutNotify(),
        // sessionStorage.removeItem("cart"),
        // setTimeout(() => window.location.reload(), 3000))
        warningNotify();
  };

  return (
    <>
      <div className="order-finalisation-container">
        <div className="order-finalisation-container-header">
          <ClearOutlinedIcon
            style={{ fontSize: 32, cursor: "pointer" }}
            onClick={() => {
              document
                .querySelector(".order-finalisation-container")
                .classList.remove("active");
            }}
          />
        </div>
        <div className="order-finalisation-inner-container">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: -0.7, width: "40%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="order-finalisation-text-field-container">
              <div>Contact information</div>
              <TextField
                required
                id="name"
                label="Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                error={nameValidator(customerName).eState}
                helperText={nameValidator(customerName).eMsg}
                autoComplete="true"
              />
              <TextField
                required
                label="Phone"
                value={customerPhoneNr}
                onChange={(e) => setCustomerPhoneNr(e.target.value)}
                error={phoneNumValidator(customerPhoneNr).eState}
                helperText={phoneNumValidator(customerPhoneNr).eMsg}
              />
              <TextField
                required
                type="email"
                id="order-user-email"
                label="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                error={emailValidator(customerEmail).eState}
                helperText={emailValidator(customerEmail).eMsg}
                autoComplete="true"
              />
            </div>
          </Box>
          <hr />
          <div className="order-finalisation-product-details">
            <div className="order-finalisation-order-processing-container">
              <FormControl>
                <div>Order processing:</div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Home delivery"
                  // defaultValue={() => setDeliveryType("Home delivery")}
                  name="radio-buttons-group"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                >
                  <FormControlLabel
                    value="Home delivery"
                    control={<Radio />}
                    label="Delivery"
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                  <FormControlLabel
                    value="Personal collection"
                    control={<Radio />}
                    label="Personal collection"
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                  <FormControlLabel
                    value="On site"
                    control={<Radio />}
                    label="On site"
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: -0.7, width: "40%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="order-finalisation-box-details">
                  <TextField
                    required
                    id="text"
                    label="Street"
                    style={{ width: "70%" }}
                    onChange={(e) => setCustomerStreet(e.target.value)}
                    // onChange={(e) => customerAddress.push(e.target.value)}
                    error={streetValidator(customerStreet).eState}
                    helperText={streetValidator(customerStreet).eMsg}
                  />
                  <TextField
                    required
                    label="Home nr"
                    style={{ width: "30%" }}
                    onChange={(e) => setCustomerHomeNr(e.target.value)}
                  />
                  <TextField
                    required
                    id="miasto"
                    label="City"
                    style={{ width: "40%" }}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    error={streetValidator(customerCity).eState}
                    helperText={streetValidator(customerCity).eMsg}
                  />
                  <TextField
                    id="home-number"
                    label="Apartment nr"
                    style={{ width: "34%" }}
                  />
                  <TextField
                    id="stock"
                    label="Floor"
                    style={{ width: "24.5%" }}
                  />
                </div>
              </Box>
            </div>
            <div className="order-finalisation-payment-method-container">
              <div>Payment method:</div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="Blik"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="Blik"
                    control={<Radio />}
                    label="Blik"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FormControlLabel
                    value="Szybki przelew"
                    control={<Radio />}
                    label="Credit card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FormControlLabel
                    value="Przy odbiorze"
                    control={<Radio />}
                    label="Payment on delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <hr />
          <div className="order-finalisation-quantity-extra-buttons">
            <AnotherButton
              id="addToCart"
              content={"ORDER" + " " + "( " + cartValue() + " PLN )"}
              clickEvent={() => {
                removeCart();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderFinalisation;
