import React from "react";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

// Actions
import { toggleMobileNav } from "../../../redux/actions/dashboardActions";

// Styles
import { MenuWrapper } from "./styles";

const Header = () => {
  const dispatch = useDispatch();

  const onToggleMobileNav = () => {
    dispatch(toggleMobileNav());
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuWrapper>
          <IconButton
            edge="start"
            className=""
            color="inherit"
            aria-label="menu"
            onClick={onToggleMobileNav}
          >
            <MenuIcon />
          </IconButton>
        </MenuWrapper>
        <Typography variant="h6" className="">
          Arbitration Distributed
        </Typography>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          edge="end"
        >
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
