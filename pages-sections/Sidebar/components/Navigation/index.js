import React from "react";
import { useSelector, useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setDashboardNav(tab));
  };
  return (
    <Wrapper>
      <Title>Dashboard</Title>
      <List component="nav" aria-label="main mailbox folders">
        <StyledListItem
          button
          isActive={activeTab === "contracts"}
          onClick={() => handleTabClick("contracts")}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Contracts" />
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
      <Divider />
    </Wrapper>
  );
};

export default Navigation;
