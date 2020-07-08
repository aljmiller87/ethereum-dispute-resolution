import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import NotificationsIcon from "@material-ui/icons/Notifications";

// Components
import AppNotification from "../../../components/AppNotification";

// Hooks
import useNotifications from "../../../hooks/useNotifications";

// Actions
import { toggleMobileNav } from "../../../redux/actions/dashboardActions";

// Styles
import { MenuWrapper, DesktopWrapper } from "./styles";

const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { newNotifications, alertHidden, hideAlertFunc } = useNotifications();

  const onToggleMobileNav = () => {
    dispatch(toggleMobileNav());
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    hideAlertFunc();
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <DesktopWrapper>
          <Link href="/">
            <a style={{ color: "inherit" }}>
              <Typography variant="h6" className="">
                Arbitration Distributed
              </Typography>
            </a>
          </Link>
          <div>
            <IconButton
              aria-label="show new notifications"
              color="inherit"
              edge="end"
              onClick={handleClick}
            >
              <Badge
                badgeContent={alertHidden ? 0 : newNotifications}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <AppNotification anchorEl={anchorEl} handleClose={handleClose} />
          </div>
        </DesktopWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
