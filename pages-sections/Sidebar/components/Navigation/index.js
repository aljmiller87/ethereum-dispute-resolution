import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Router from "next/router";

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

// Utilities
import { abbreviateAddress } from "../../../../utilities/addressHelpers";

// Styles
import { Wrapper, StyledListItem, Title } from "./styles";

const Navigation = () => {
  const { activeTab } = useSelector((state) => state.dashboardReducer);
  const { coinbase, currentView } = useSelector(
    (state) => state.accountReducer
  );
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const handleTabClick = (tab, route = false) => {
    dispatch(setDashboardNav(tab));
    if (route) {
      Router.push("/dashboard/[account]", route);
    }
  };

  return (
    <Wrapper>
      {!!coinbase.address && (
        <>
          <Title>Account</Title>
          <List component="nav" aria-label="TBD">
            <StyledListItem
              button
              isActive={
                coinbase.address === currentView.address &&
                activeTab === "dashboard"
              }
              onClick={() =>
                handleTabClick("dashboard", `/dashboard/${coinbase.address}`)
              }
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </StyledListItem>
            {(activeTab === "detail" ||
              pathname === "/dashboard/contract/[contract]") && (
              <StyledListItem
                button
                isActive={
                  coinbase.address === currentView.address &&
                  activeTab === "detail"
                }
                onClick={() => handleTabClick("detail")}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Detail" />
              </StyledListItem>
            )}
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
        </>
      )}
      {coinbase.address !== currentView.address && (
        <>
          <Title>User {abbreviateAddress(currentView.address)}</Title>
          <List component="nav" aria-label="TBD">
            <StyledListItem
              button
              isActive={
                coinbase.address !== currentView.address &&
                activeTab === "dashboard"
              }
              onClick={() =>
                handleTabClick("dashboard", `/dashboard/${currentView.address}`)
              }
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </StyledListItem>
            {(activeTab === "detail" ||
              pathname === "/dashboard/contract/[contract]") && (
              <StyledListItem
                button
                isActive={
                  coinbase.address !== currentView.address &&
                  activeTab === "detail"
                }
                onClick={() => handleTabClick("detail")}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Detail" />
              </StyledListItem>
            )}
          </List>
        </>
      )}
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
