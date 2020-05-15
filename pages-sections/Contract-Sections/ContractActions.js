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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Title from "components/Title";

// Action Card Components
import Abort from "pages-sections/Contract-Sections/ActionCards/Abort.js";
import ConfirmPayment from "pages-sections/Contract-Sections/ActionCards/ConfirmPayment.js";

// Contract Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "components/config/contract.js";

const ActionCards = {
  abort: Abort,
  confirmPayment: ConfirmPayment,
};

const ActionCard = ({ action, callback, ...rest }) => {
  if (!action || !Object.keys(action).length > 0) {
    return null;
  }
  const Component = ActionCards[action.slug];
  return <Component action={action} onSuccess={callback} {...rest} />;
};

const ContractActions = ({ details, account, onSuccessfulCall, ...rest }) => {
  const { buyer, seller, balance, escrowState, disputeState } = details;
  const [userAlias, setUserAlias] = useState("");
  const isDispute = details.escrowState === "IN_DISPUTE";
  const StepsConfig = isDispute ? DisputeSteps : EscrowSteps;
  const CurrentStep = isDispute ? disputeState : escrowState;

  const checkAlias = () => {
    if (account === buyer) {
      setUserAlias("buyer");
    }
    if (account === seller) {
      setUserAlias("seller");
    }
  };

  const findStatusIndex = (array, status) => {
    const index = array.findIndex((state) => state === status);
    return index >= 0 ? true : false;
  };

  const renderAvailableActions = () => {
    const AvailableActions = Object.keys(StepsConfig[CurrentStep].actions);
    const userActions = AvailableActions.filter((action) => {
      const actionConfigObject = StepsConfig[CurrentStep].actions[action];
      return findStatusIndex(actionConfigObject.requiredUsers, userAlias);
    });
    console.log("userActions", userActions);
    return userActions.map((action) => {
      const actionConfigObject = StepsConfig[CurrentStep].actions[action];
      console.log("actionConfigObject", actionConfigObject);
      return (
        <GridItem xs={12} sm={12} md={6} lg={4} key={action}>
          <ActionCard
            action={actionConfigObject}
            callback={onSuccessfulCall}
            {...rest}
          />
        </GridItem>
      );
    });
  };

  useEffect(() => {
    checkAlias();
  }, [account]);

  return (
    <Wrapper>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Center>
            {/* <Title type="h2">
              {isDispute
                ? DisputeSteps[disputeState].name
                : EscrowSteps[escrowState].name}
            </Title> */}
            <Title type="h2">Available Contract Actions</Title>
            <p>
              <strong>{StepsConfig[CurrentStep].name}:</strong>
              {StepsConfig[CurrentStep].description}
            </p>
          </Center>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">{renderAvailableActions()}</GridContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: #999;
  padding: 40px 0;

  .ActionCard {
    height: 90%;

    button {
      margin-left: auto;
      margin-right: auto;
    }
  }
  .ActionCard-Body {
    padding-top: 2rem;
  }
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

export default ContractActions;
