import React, { useState, useEffect } from "react";

import styled from "styled-components";

// material components
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// material icons
import { People } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Title from "components/Title";

const ContractDetails = ({ details, account }) => {
  const { buyer, seller, balance, escrowState } = details;

  return (
    <Wrapper>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Center>
            <Title type="h2">Contract Summary</Title>
          </Center>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <List component="nav" aria-labelledby="contract details">
            <ListItem>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Buyer" secondary={buyer} />
              {account === buyer && (
                <Chip
                  label="Your role"
                  color="primary"
                  icon={<DoneIcon />}
                  variant="outlined"
                />
              )}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Seller" secondary={seller} />
              {account === seller && (
                <Chip
                  label="Your role"
                  color="primary"
                  icon={<DoneIcon />}
                  variant="outlined"
                />
              )}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon className="fab fa-ethereum" />
              </ListItemIcon>
              <ListItemText primary="Contract Balance" secondary={balance} />
            </ListItem>
          </List>
        </GridItem>
        {escrowState === "IN_DISPUTE" && (
          <GridItem xs={12} sm={12} md={6}>
            <List component="nav" aria-labelledby="contract details">
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="judge1" secondary={buyer} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="judge2" secondary={seller} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="judge3" secondary={seller} />
              </ListItem>
            </List>
          </GridItem>
        )}
      </GridContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: #999;
  padding: 40px 0;
  @media (min-width: 576px) {
    padding: 50px 0;
  }
  @media (min-width: 768px) {
    padding: 60px 0;
  }
  @media (min-width: 992px) {
    padding: 70px 0;
  }
`;

const Center = styled.div`
  text-align: center;
`;

export default ContractDetails;
