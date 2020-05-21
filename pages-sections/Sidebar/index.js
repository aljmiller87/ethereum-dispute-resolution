import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";

// Components
import ConnectionStatus from "./components/ConnectionStatus";
import Navigation from "./components/Navigation";

// Styles
import { StyledSideBar } from "./styles";

const Sidebar = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isNavCollapsed, setNavCollapsed] = useState(true);

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

  const onToggleCollapsedNav = () => {
    setNavCollapsed((prevState) => !prevState);
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
        open={type.includes("temporary") ? !isNavCollapsed : true}
        onClose={onToggleCollapsedNav}
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
