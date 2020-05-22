import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "@material-ui/core/Drawer";

// Components
import ConnectionStatus from "./components/ConnectionStatus";
import Navigation from "./components/Navigation";

// Actions
import { toggleMobileNav } from "../../redux/actions/dashboardActions";

// Styles
import { StyledSideBar } from "./styles";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { mobileMenuOpen } = useSelector((state) => state.dashboardReducer);
  const [isRendered, setIsRendered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsRendered(true);
    setWidthState();
    window.addEventListener("resize", setWidthState);
    return () => {
      window.removeEventListener("resize", setWidthState);
    };
  }, []);

  const setWidthState = () => {
    setWindowWidth(window.innerWidth);
  };

  const onToggleMobileNav = () => {
    dispatch(toggleMobileNav());
  };

  if (!isRendered) {
    return null;
  }

  let type = windowWidth > 991 ? "permanent" : "temporary";
  console.log("type", type);
  return (
    <StyledSideBar>
      <Drawer
        className="app-sidebar-content"
        variant={type}
        open={type.includes("temporary") ? mobileMenuOpen : true}
        onClose={onToggleMobileNav}
        classes={{
          paper: "SideBar-Mobile",
        }}
      >
        <ConnectionStatus />
        <Navigation />
      </Drawer>
    </StyledSideBar>
  );
  // return <div>SIDEBAR</div>;
};

export default Sidebar;
