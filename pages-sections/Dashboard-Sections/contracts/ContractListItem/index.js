import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _get from "lodash/get";
import Link from "next/link";
import styled from "styled-components";

// Material Core Components
import {
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";

// Ethereum
import ThreeJudge from "../../../../ethereum/threejudge";

// Actions
import * as contractActions from "../../../../redux/actions/contractActions";

// Utilities
import { formatContractData } from "../../../../utilities/contractHelpers";

const ContractListItem = ({ contract }) => {
  const dispatch = useDispatch();
  const dataObj = useSelector((state) => state.contractReducer[contract]);
  const { listeningStatus } = dataObj;

  const setContractEventListeners = async (contractAddress) => {
    /* If ethereum event subscription is either:
      1. Loading
      2. Already subscribed or
      3. Has error
      Do not attempt additional subscription
    */
    if (
      listeningStatus &&
      (listeningStatus.isLoading ||
        listeningStatus.isListening ||
        listeningStatus.hasError)
    ) {
      return null;
    }
    try {
      const instance = ThreeJudge(contractAddress);
      const escrowSummary = await instance.methods.getStatus().call();
      const disputeSummary = await instance.methods.getDisputeStatus().call();
      const { escrowState, disputeState } = formatContractData(
        escrowSummary,
        disputeSummary
      );

      if (
        escrowState === "CANCELLED" ||
        escrowState === "COMPLETE" ||
        disputeState === "COMPLETE"
      ) {
        console.log(contractAddress, escrowState, disputeState);
        throw new Error("Contract is inactive");
      }
      instance.events
        .allEvents({
          fromBlock: "latest",
        })
        .on("connected", function (subscriptionId) {
          console.log("connected subscriptionId", subscriptionId);
          dispatch(
            contractActions.setListeningStatus(contractAddress, {
              isLoading: false,
              isListening: subscriptionId,
              hasError: false,
            })
          );
        })
        .on("data", function (event) {
          console.log("data event", event);
          dispatch(contractActions.addEvent(contractAddress, event));
          // Need to dispatch asyncFetchState
          dispatch(contractActions.asyncFetchState(contractAddress, instance));
        })
        .on("changed", function (event) {
          console.log("changed event", event);
          // remove event from local database
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.log("error", error);
          console.log("error receipt", receipt);
        });
    } catch (error) {
      dispatch(
        contractActions.setListeningStatus(contractAddress, {
          isLoading: false,
          isListening: false,
          hasError: error.message,
        })
      );
    }
  };

  useEffect(() => {
    // setContractEventListeners(contract);
  }, [listeningStatus]);

  return (
    <>
      <ListItem button>
        <Link
          href="/dashboard/contract/[contract]"
          as={`/dashboard/contract/${contract}`}
        >
          <StyledLink>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={contract} />
          </StyledLink>
        </Link>
      </ListItem>
      <Divider />
    </>
  );
};

const StyledLink = styled.a`
  align-items: center;
  display: flex;
`;

export default ContractListItem;
