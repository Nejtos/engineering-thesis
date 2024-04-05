import * as React from "react";
import {
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button1 from "../Button";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import axios from "axios";
import { emailValidator } from "../../pages/order-panel/components/UserFormValidation.jsx";
import { Lock } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext.jsx";

const Form = () => {
  let navigate = useNavigate();

  const [loginError, setLoginError] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [cookies, setCookies] = useCookies(["token"]);
  const { setUserState } = React.useContext(UserContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        setCookies("token", result.data.token);
        setCookies("userID", result.data.user.id);
        setCookies("expiresAt", result.data.expiresAt);
        setUserState({
          id: result.data.user.id,
          name: result.data.user.name,
          email: result.data.user.email,
          userAvatar: result.data.user.userAvatar,
          phoneNum: result.data.user.phoneNum,
          cardNum: result.data.user.cardNum,
          cardExpirationDate: result.data.user.cardExpirationDate,
        });
        navigate("/home");
      });
    // .catch(error => {(error.response.data.error) ? setLoginError(error.response.data.error) : null})
  };

  return (
    <>
      <div className="form-border">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            id="email"
            type="email"
            name="user-email"
            label="Email"
            variant="outlined"
            color="secondary"
            sx={{ width: "90%" }}
            autoComplete="true"
            onChange={(e) => setEmail(e.target.value)}
            // error={emailValidator(email).eState}
            // helperText={emailValidator(email).eMsg}
          />
          <FormControl
            id="outlined-from-control"
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="password" color="secondary">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {loginError}
        </Box>
        <Button1 content={"Log in"} clickEvent={handleSubmit} />
        Don't have an account yet? <a href="">Contact us</a>
      </div>
    </>
  );
};
export default Form;
