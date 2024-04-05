import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, FormControl, TextField, InputAdornment } from "@mui/material";
import "./Header.css"
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from 'react';
import defaultUser from "../img/default-user.png";

const Header = () => {
    const { userState } = useContext(UserContext);
    const userName = userState.name.split(" ").join("-").toLowerCase()

    return (
        <div className="top-box">
        <div className="top-box-left">
        <img src={userState.userAvatar ? `http://localhost:8000/images/${userName}-avatar.png` : defaultUser } width="32px" height="32px" />
          Hello {userState.name}, welcome back!
        </div>
        <div className="top-box-right">
          <FormControl>
            <TextField
              size="small"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <div className="notification-btn"></div>
          <div className="settings-btn"></div>
        </div>
      </div>
    )
};

export default Header;