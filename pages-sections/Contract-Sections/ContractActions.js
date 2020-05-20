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
import ConfirmProductSent from "pages-sections/Contract-Sections/ActionCards/ConfirmProductSent.js";
import ConfirmDelivery from "pages-sections/Contract-Sections/ActionCards/ConfirmDelivery.js";
import InitDispute from "pages-sections/Contract-Sections/ActionCards/InitDispute.js";
import ProvideTestimony from "pages-sections/Contract-Sections/ActionCards/ProvideTestimony.js";
import PickJudge from "pages-sections/Contract-Sections/ActionCards/PickJudge.js";
import NominateFinalJudge from "pages-sections/Contract-Sections/ActionCards/NominateFinalJudge.js";
import ConfirmFinalJudge from "pages-sections/Contract-Sections/ActionCards/ConfirmFinalJudge.js";
import ArbitrateDispute from "pages-sections/Contract-Sections/ActionCards/ArbitrateDispute.js";
import DistributeFunds from "pages-sections/Contract-Sections/ActionCards/DistributeFunds.js";

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
  confirmProductSent: ConfirmProductSent,
  confirmDelivery: ConfirmDelivery,
  initDispute: InitDispute,
  provideTestimony: ProvideTestimony,
  pickJudge: PickJudge,
  nominateFinalJudge: NominateFinalJudge,
  confirmFinalJudge: ConfirmFinalJudge,
  arbtrateDispute: ArbitrateDispute,
  distributeFunds: DistributeFunds,
};

const ActionCard = ({ action, ...rest }) => {
  if (!action || !Object.keys(action).length > 0) {
    return null;
  }
  const Component = ActionCards[action.slug];
  if (!Component) {
    return null;
  }
  return <Component action={action} {...rest} />;
};

const ContractActions = ({ details, account, ...rest }) => {
  const { buyer, seller, escrowState, disputeState, disputeSummary } = details;
  const {
    buyerJudge,
    buyerJudgeHasNominatedFinalJudge,
    buyerJudgeHasVotedForResolution,
    sellerJudge,
    sellerJudgeHasNominatedFinalJudge,
    sellerJudgeHasVotedForResolution,
    nominatedJudge,
    finalJudge,
    finalJudgeHasVotedForResolution,
    votesForBuyer,
    votesForSeller,
    deadline,
    awaitingParty,
  } = disputeSummary || {};

  const [userAlias, setUserAlias] = useState("");
  const isDispute = details.escrowState === "IN_DISPUTE";
  const StepsConfig = isDispute ? DisputeSteps : EscrowSteps;
  const CurrentStep = isDispute ? disputeState : escrowState;

  const checkAlias = () => {
    if (!account) {
      return null;
    }
    switch (account.toLowerCase()) {
      case buyer.toLowerCase():
        setUserAlias("buyer");
        break;
      case seller.toLowerCase():
        setUserAlias("seller");
        break;
      case buyerJudge.toLowerCase():
        setUserAlias("buyerJudge");
        break;
      case sellerJudge.toLowerCase():
        setUserAlias("sellerJudge");
        break;
      case finalJudge.toLowerCase():
        setUserAlias("finalJudge");
        break;

      default:
        setUserAlias("");
        break;
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
    return userActions.map((action) => {
      const actionConfigObject = StepsConfig[CurrentStep].actions[action];
      return (
        <GridItem xs={12} sm={12} md={6} lg={4} key={action}>
          <ActionCard action={actionConfigObject} {...rest} />
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
