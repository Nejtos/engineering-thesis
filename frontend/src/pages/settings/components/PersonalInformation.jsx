import "./PersonalInformation.css";
import {
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { green } from "@mui/material/colors";
import defaultUser from "../../../img/default-user.png";
import {
  cardNumValidate,
  cardExpirationDateValidate,
  phoneNumValidate,
  passwordValidate,
} from "../../../util/Validators";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";

const PersonalInformation = () => {
  const { userState } = useContext(UserContext);
  const userName = userState.name.split(" ").join("-").toLowerCase()
  const splitUserName = userState.name.split(" ");
  const [userCardNum, setUserCardNum] = useState("");
  const [userCardExpirationDate, setUserCardExpirationDate] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userConfirmedPass, setUserConfirmedPass] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [user, setUser] = useState("");
  const [cardNumValidator, setCardNumValidator] = useState({
    eState: false,
    eMsg: "",
  });
  const [cardExpirationDateValidator, setCardExpirationDateValidator] =
    useState({ eState: false, eMsg: "" });
  const [phoneNumValidator, setPhoneNumValidator] = useState({
    eState: false,
    eMsg: "",
  });
  const [passwordValidator, setPasswordValidator] = useState({
    eState: false,
    eMsg: "",
  })

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/getUser", {
        headers: {
          userID: Cookies.get("userID"),
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const styles = [
    {
      width: "20%",
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
    },
    {
      width: "34%",
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
    },
    {
      width: "100%",
      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
        {
          display: "none",
        },
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
    },
    {
      width: "50%",
      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
        {
          display: "none",
        },
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
    },
  ];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let userName = userState.name.split(" ").join("-");
    userName = userName.toLowerCase();
    formData.append("userId", userState.id);
    let fileName = "";
    fileName += userName + "-avatar";
    formData.append("file", file, fileName + file.name.slice(-4));
    axios.post("http://localhost:8000/users/avatarUpdate", formData);
    // axios.post("http://localhost:8000/users/avatarUpdate", {
    //   userName: userName,
    //   img: formData,
    // });
  };

  const checkCardNum = () => {
    let status = false;
    if (userCardNum.length !== 0) {
      if (cardNumValidate(userCardNum).eState === false) {
        setCardNumValidator(false, "");
        status = true;
        return status;
      } else {
        setCardNumValidator(cardNumValidate(userCardNum));
        status = false;
        return status;
      }
    } else {
      if (cardNumValidate(user.cardNum).eState === false) {
        setCardNumValidator(false, "");
        return true;
      } else {
        setCardNumValidator(cardNumValidate(user.cardNum));
        status = false;
        return status;
      }
    }
  };

  const checkCardExpirationDate = () => {
    let status = false;
    if (userCardExpirationDate.length !== 0) {
      if (cardExpirationDateValidate(userCardExpirationDate).eState === false) {
        setCardExpirationDateValidator(false, "");
        status = true;
        return status;
      } else {
        setCardExpirationDateValidator(
          cardExpirationDateValidate(userCardExpirationDate)
        );
        status = false;
        return status;
      }
    } else {
      if (
        cardExpirationDateValidate(user.cardExpirationDate).eState === false
      ) {
        setCardExpirationDateValidator(false, "");
        return true;
      } else {
        setCardExpirationDateValidator(
          cardExpirationDateValidate(user.cardExpirationDate)
        );
        status = false;
        return status;
      }
    }
  };

  const checkPhoneNum = () => {
    let status = false;
    if (userPhoneNum.length !== 0) {
      if (phoneNumValidate(userPhoneNum).eState === false) {
        setPhoneNumValidator(false, "");
        status = true;
        return status;
      } else {
        setPhoneNumValidator(phoneNumValidate(userPhoneNum));
        status = false;
        return status;
      }
    } else {
      if (phoneNumValidate(user.phoneNum).eState === false) {
        setPhoneNumValidator(false, "");
        return true;
      } else {
        setPhoneNumValidator(phoneNumValidate(user.phoneNum));
        status = false;
        return status;
      }
    }
  };

  const checkPasswords = () => {
    if (userPass === '' && userConfirmedPass === ''){
      setPasswordValidator(false, "");
      return true;
    }
    else {
      if(passwordValidate(userPass, userConfirmedPass).eState === false){
        return true;
      }
      else{
        setPasswordValidator(passwordValidate(userPass, userConfirmedPass))
        return false;
      }
    }
  }

  const saveChanges = () => {
    let v1, v2, v3 = "";
    console.log(checkPasswords())
    console.log({userPass})
    {userCardNum === '' ? v1 = user.cardNum : v1 = userCardNum}
    {userCardExpirationDate === '' ? v2 = user.cardExpirationDate : v2 = userCardExpirationDate}
    {userPhoneNum === '' ? v3 = user.phoneNum : v3 = userPhoneNum}
    {
      checkCardNum() && checkCardExpirationDate() && checkPhoneNum() && checkPasswords()
        ?
         axios.post("http://localhost:8000/users/personalInfoUpdate", {
              id: userState.id,
              cardNum: v1,
              userCardExpirationDate: v2,
              phoneNum: v3,
              pass: userPass,
            })
        : null 
    }

    // {
    //   (cardNumValidate(user.cardNum).eState === false && userCardNum.length === 0)
    //     ? setCardNumValidator(false, "", true)
    //     : setCardNumValidator(cardNumValidate(userCardNum));
    // }
    // {
    //   cardExpirationDateValidate(user.cardExpirationDate).eState === false &&
    //   userCardExpirationDate.length === 0
    //     ? setCardExpirationDateValidator(false, "", true)
    //     : setCardExpirationDateValidator(
    //         cardExpirationDateValidate(userCardExpirationDate)
    //       );
    // }
    // {
    //   phoneNumValidate(user.phoneNum).eState === false &&
    //   userPhoneNum.length === 0
    //     ? setPhoneNumValidator(false, "", true)
    //     : setPhoneNumValidator(phoneNumValidate(userPhoneNum));
    // }
    // console.log(userCardNum)
    // {
    //   cardNumValidate(user.cardNum) && cardNumValidate(userCardNum) && userCardNum.length !== 0 &&
    //   cardNumValidate(user.cardExpirationDate) && cardNumValidate(userCardExpirationDate) && userCardExpirationDate.length !== 0 &&
    //   cardNumValidate(user.phoneNum) && cardNumValidate(userPhoneNum) && userPhoneNum.length !== 0
    //   // cardNumValidator.eState === false &&
    //   // cardExpirationDateValidator.eState === false &&
    //   // phoneNumValidator.eState === false
    // ?
    //   axios.post("http://localhost:8000/users/personalInfoUpdate", {
    //     id: userState.id,
    //     cardNum: userCardNum,
    //     userCardExpirationDate: userCardExpirationDate,
    //     phoneNum: userPhoneNum,
    //   })
    // : console.log("XD")
    // }
    // setCardExpirationDateValidator(
    //   cardExpirationDateValidate(userCardExpirationDate)
    // );
    // setPhoneNumValidator(phoneNumValidate(userPhoneNum));

    // axios.post("http://localhost:8000/users/personalInfoUpdate", {
    //   id: userState.id,
    //   cardNum: userCardNum,
    //   userCardExpirationDate: userCardExpirationDate,
    //   phoneNum: userPhoneNum,
    // });
    // .then(() => {
    //     console.log("Updates users info send");
    // })
    // .catch((error) => {
    //     console.log(error.response.data);
    // });
  };

  return (
    <>
      <div className="personal-info-main-user-box">
        <div className="personal-info-top-main-user-box">
          <div className="personal-info-left-top-main-user-box">
            <div className="personal-info-user-image-box">
              {/* <input type="file" onChange={handleChange} /> */}
              <img src={preview === undefined ? (userState.userAvatar ? `http://localhost:8000/images/${userName}-avatar.png` : defaultUser) : preview} />
              {/* <Avatar
                src={L}
                sx={{ width: "50%", height: "90%" }}
              /> */}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                component="label"
                variant="contained"
                sx={styles[1]}
                startIcon={<CloudUploadIcon />}
                onChange={handleChange}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                variant="contained"
                // sx={{
                //   width: "36%",
                //   borderRadius: "20px",
                //   height: "32px",
                // }}
                sx={styles[1]}
                onClick={handleSubmit}
              >
                Save avatar
              </Button>
            </div>
          </div>
          <div className="personal-info-user-box-main-content">
            {/* <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 0, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            > */}
            <TextField
              id="outlined-basic"
              variant="outlined"
              disabled
              value={splitUserName[0] || ""}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              disabled
              value={splitUserName[1] || ""}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              disabled
              value={userState.email || ""}
            />
            {/* </Box> */}
          </div>
        </div>
        <div className="personal-info-bottom-main-user-box">
          <div className="personal-info-user-box-main-content-details">
            <div className="personal-info-user-box-main-content-details-1row">
              <TextField
                id="outlined-basic"
                label="Card number"
                variant="outlined"
                type="number"
                // placeholder={userState.cardNum}
                placeholder={user.cardNum ? user.cardNum : ""}
                value={userCardNum || ""}
                onChange={(e) =>
                  e.target.value < 0
                    ? setUserCardNum((e.target.value = 0))
                    : setUserCardNum(e.target.value)
                }
                error={cardNumValidator.eState}
                helperText={cardNumValidator.eMsg}
                sx={styles[2]}
              />
              <TextField
                id="outlined-basic"
                label="Expiration Date"
                variant="outlined"
                placeholder={
                  user.cardExpirationDate ? user.cardExpirationDate : ""
                }
                value={userCardExpirationDate || ""}
                onChange={(e) =>
                  e.target.value < 0
                    ? setUserCardExpirationDate((e.target.value = 0))
                    : setUserCardExpirationDate(e.target.value)
                }
                error={cardExpirationDateValidator.eState}
                helperText={cardExpirationDateValidator.eMsg}
                sx={styles[3]}
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Phone number"
              variant="outlined"
              type="number"
              placeholder={user.phoneNum ? user.phoneNum : ""}
              value={userPhoneNum || ""}
              onChange={(e) =>
                e.target.value < 0
                  ? setUserPhoneNum((e.target.value = 0))
                  : setUserPhoneNum(e.target.value)
              }
              error={phoneNumValidator.eState}
              helperText={phoneNumValidator.eMsg}
              sx={styles[2]}
            />
            <div className="personal-info-user-box-main-content-details-2row">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="New password"
                value={userPass || ""}
                onChange={(e) => setUserPass(e.target.value)}
                sx={{ width: "50%" }}
                error={passwordValidator.eState}
                helperText={passwordValidator.eMsg}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Confirm password"
                value={userConfirmedPass || ""}
                onChange={(e) => setUserConfirmedPass(e.target.value)}
                sx={{ width: "50%" }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            sx={styles[0]}
            // sx={{
            //   width: "200px",
            //   borderRadius: "20px",
            //   height: "42px",
            // }}
            onClick={saveChanges}
          >
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
};
export default PersonalInformation;
