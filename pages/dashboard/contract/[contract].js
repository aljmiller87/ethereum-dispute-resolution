import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";

// Ethereum
import ThreeJudge from "../../../ethereum/threejudge";

// Actions
import * as contractActions from "../../../redux/actions/contractActions";
import { setDashboardNav } from "../../../redux/actions/dashboardActions";

// Layout
import Layout from "../../../layouts";

// Sections
import ContractDetails from "pages-sections/Contract-Sections/ContractDetails";
import StatusTracker from "pages-sections/Contract-Sections/StatusTracker";
import ContractActions from "pages-sections/Contract-Sections/ContractActions";

// Components
import ContractLoader from "../../../pages-sections/Dashboard-Sections/contracts/ContractLoader";

// Utilities
import { formatContractData } from "../../../utilities/contractHelpers";

const Contract = ({ contractAddress, summaryProps, eventsProps, ...rest }) => {
  const dispatch = useDispatch();

  // Selectors
  const { isEthereumConnected } = useSelector((state) => state.networkReducer);
  const { account } = useSelector((state) => state.accountReducer);

  const { summary, events, listeningStatus } = useSelector(
    (state) => state.contractReducer[contractAddress] || {}
  );

  const noActiveListinging = (data) => {
    if (typeof data === "undefined") {
      return true;
    }
    const { isLoading, isListening, hasError } = data;
    return isLoading === false && isListening === false && hasError === false;
  };

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
      const { escrowState, disputeState } = formatContractData({
        escrowSummary,
        disputeSummary,
      });

      if (
        escrowState === "CANCELLED" ||
        escrowState === "COMPLETE" ||
        disputeState === "COMPLETE"
      ) {
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
    // if page is loaded directly, then redux store will need to be updated because it is empty on page load
    if (!_isEqual(summaryProps, summary)) {
      dispatch(
        contractActions.setSingleContractData(
          contractAddress,
          summaryProps,
          eventsProps
        )
      );
    }
  }, []);

  useEffect(() => {
    dispatch(setDashboardNav("detail"));
    if (isEthereumConnected && noActiveListinging(listeningStatus)) {
      setContractEventListeners(contractAddress);
    }
  }, [isEthereumConnected]);

  return (
    <Layout layout="dashboard">
      {typeof summary !== "undefined" && (
        <>
          <ContractDetails details={summary} account={account} />
          <StatusTracker details={summary} />
          <ContractActions
            details={summary}
            account={account}
            contractAddress={contractAddress}
          />
        </>
      )}
      <ContractLoader address={contractAddress} />
    </Layout>
  );
};
Contract.getInitialProps = async (props) => {
  const address = props.query.contract;
  const contract = ThreeJudge(address);
  const summary = await contract.methods.getStatus().call();
  const disputeSummary = await contract.methods.getDisputeStatus().call();
  const formattedSummary = formatContractData({ summary, disputeSummary });
  const logs = await contract.getPastEvents("allEvents", {
    fromBlock: 0,
  });

  return {
    contractAddress: address,
    summaryProps: formattedSummary,
    eventsProps: logs,
  };
};

export default Contract;
