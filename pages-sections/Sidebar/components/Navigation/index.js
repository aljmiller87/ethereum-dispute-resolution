import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Material
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListIcon from "@material-ui/icons/List";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SearchIcon from "@material-ui/icons/Search";

// Actions
import { setDashboardNav } from "../../../../redux/actions/dashboardActions";

// Styles
import { Wrapper, StyledListItem, Title } from "./styles";

const Navigation = () => {
  const { activeTab } = useSelector((state) => state.dashboardReducer);
  const { account } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const Router = useRouter();

  const handleTabClick = (tab) => {
    dispatch(setDashboardNav(tab));
    if (tab === "dashboard" && typeof account !== "undefined") {
      Router.push("/dashboard/[account]", `/dashboard/${account}`);
    }
  };
  return (
    <Wrapper>
      <Title>Account</Title>
      <List component="nav" aria-label="main mailbox folders">
        <StyledListItem
          button
          isActive={activeTab === "dashboard"}
          onClick={() => handleTabClick("dashboard")}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledListItem>
        <StyledListItem
          button
          isActive={activeTab === "detail"}
          onClick={() => handleTabClick("detail")}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Detail" />
        </StyledListItem>
        <StyledListItem
          button
          isActive={activeTab === "create"}
          onClick={() => handleTabClick("create")}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Create" />
        </StyledListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <StyledListItem
          button
          isActive={activeTab === "search"}
          onClick={() => handleTabClick("search")}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </StyledListItem>
      </List>
    </Wrapper>
  );
};

export default Navigation;
