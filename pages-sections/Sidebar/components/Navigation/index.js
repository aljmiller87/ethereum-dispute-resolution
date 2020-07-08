import React, { useEffect } from "react";
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
import {
  setDashboardUser,
  setDashboardView,
} from "../../../../redux/actions/dashboardActions";
import { setCoinbaseAsCurrent } from "../../../../redux/actions/accountActions";

// Utilities
import { abbreviateAddress } from "../../../../utilities/addressHelpers";

// Styles
import { Wrapper, StyledListItem, Title } from "./styles";

const Navigation = () => {
  const { activeTab, isCoinbase } = useSelector(
    (state) => state.dashboardReducer
  );
  const { coinbase, currentView } = useSelector(
    (state) => state.accountReducer
  );
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const handleTabClick = (isCoinbase, tab, route = false) => {
    dispatch(setDashboardUser(isCoinbase));
    dispatch(setDashboardView(tab));
    if (tab === "create") {
      dispatch(setCoinbaseAsCurrent());
    }
    if (route) {
      Router.push("/dashboard/[account]", route);
    }
  };

  useEffect(() => {
    const isCoinbase = isCoinbase && coinbase.address !== currentView.address;
    dispatch(setDashboardUser(isCoinbase));
  }, [coinbase.address, currentView.address, dispatch]);

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
                handleTabClick(
                  true,
                  "dashboard",
                  `/dashboard/${coinbase.address}`
                )
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
                onClick={() => handleTabClick(true, "detail")}
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
              onClick={() => handleTabClick(true, "create")}
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
                handleTabClick(
                  false,
                  "dashboard",
                  `/dashboard/${currentView.address}`
                )
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
                onClick={() => handleTabClick(false, "detail")}
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
          onClick={() => handleTabClick(false, "search")}
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
