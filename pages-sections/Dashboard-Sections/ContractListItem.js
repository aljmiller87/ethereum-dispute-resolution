import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";

// Ethereum
import web3 from "../../ethereum/web3";
import ThreeJudge from "../../ethereum/threejudge";

// Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "../../components/config/contract";

// Utilities
import { formatEscrowStatus } from "../../utilities/contractHelpers";

// Material Core Components
import {
  Button,
  CircularProgress,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
const useStyles = makeStyles(styles);

const ContractListItem = ({ contract }) => {
  const accountReducer = useSelector((state) => state.accountReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [isDispute, setIsDispute] = useState(false);
  const [isActionRequired, setIsActionRequired] = useState(false);

  const campaign = ThreeJudge(contract);

  const classes = useStyles();

  const checkIfActionRequired = () => {
    // const isBuyer = details.buyer === accountReducer.account;

    if (isDispute) {
      Object.keys(DisputeSteps[details.disputeState].action).forEach((key) => {
        // console.log("key", key);
        // console.log(
        //   DisputeSteps[details.disputeState].actions[key].requiredUsers
        // );
      });
    } else {
      Object.keys(EscrowSteps[details.escrowState].actions).forEach((key) => {
        // console.log("key", key);
        // console.log(
        //   EscrowSteps[details.escrowState].actions[key].requiredUsers
        // );
      });
    }
  };

  const fetchDetails = async () => {
    const summary = await campaign.methods.getStatus().call();
    const formattedSummary = formatEscrowStatus(summary);
    setDetails(formattedSummary);
    setIsLoading(false);
  };

  const updateAlerts = () => {
    if (!details) {
      return null;
    }
    setIsDispute(details.escrowState === "IN_DISPUTE");
    setIsComplete(details.escrowState === "COMPLETE");
    checkIfActionRequired();
  };

  // const isActiveDispute = details.escrowState !== "IN_DISPUTE";

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    updateAlerts();
  }, [details]);

  return (
    <div>
      <div className={classes.container}>
        <ListItem button disable={isLoading}>
          {isLoading ? (
            <CircularProgress size={14} />
          ) : (
            <Link href="/contract/[contract]" as={`/contract/${contract}`}>
              <StyledLink>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={contract} />
                {isDispute && <Button disabled>In Dispute</Button>}
              </StyledLink>
            </Link>
          )}
        </ListItem>
        <Divider />
      </div>
    </div>
  );
};

const StyledLink = styled.a`
  align-items: center;
  display: flex;
`;

export default ContractListItem;
