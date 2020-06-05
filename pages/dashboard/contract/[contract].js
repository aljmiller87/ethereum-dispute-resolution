import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
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

const Contract = ({
  contractAddress,
  summaryProps,
  eventsProps,
  error,
  ...rest
}) => {
  const dispatch = useDispatch();

  // Selectors
  const { coinbase, currentView } = useSelector(
    (state) => state.accountReducer
  );

  const reduxDetails = useSelector(
    (state) => state.contractDetails[contractAddress] || {}
  );

  const backToDashboard = () => {
    Router.push("/dashboard/[account]", `/dashboard/${currentView.address}`);
    // dispatch(setDashboardNav("dashboard"));
  };

  // const noActiveListinging = (data) => {
  //   if (typeof data === "undefined") {
  //     return true;
  //   }
  //   const { isLoading, isListening, hasError } = data;
  //   return isLoading === false && isListening === false && hasError === false;
  // };

  // const setContractEventListeners = async (contractAddress) => {
  //   /* If ethereum event subscription is either:
  //     1. Loading
  //     2. Already subscribed or
  //     3. Has error
  //     Do not attempt additional subscription
  //   */
  //   if (
  //     listeningStatus &&
  //     (listeningStatus.isLoading ||
  //       listeningStatus.isListening ||
  //       listeningStatus.hasError)
  //   ) {
  //     return null;
  //   }
  //   try {
  //     const instance = ThreeJudge(contractAddress);
  //     const escrowSummary = await instance.methods.getStatus().call();
  //     const disputeSummary = await instance.methods.getDisputeStatus().call();
  //     const { escrowState, disputeState } = formatContractData(
  //       escrowSummary,
  //       disputeSummary
  //     );

  //     if (
  //       escrowState === "CANCELLED" ||
  //       escrowState === "COMPLETE" ||
  //       disputeState === "COMPLETE"
  //     ) {
  //       throw new Error("Contract is inactive");
  //     }
  //     instance.events
  //       .allEvents({
  //         fromBlock: "latest",
  //       })
  //       .on("connected", function (subscriptionId) {
  //         console.log("connected subscriptionId", subscriptionId);
  //         dispatch(
  //           contractActions.setListeningStatus(contractAddress, {
  //             isLoading: false,
  //             isListening: subscriptionId,
  //             hasError: false,
  //           })
  //         );
  //       })
  //       .on("data", function (event) {
  //         console.log("data event", event);
  //         dispatch(contractActions.addEvent(contractAddress, event));
  //         dispatch(contractActions.asyncFetchState(contractAddress, instance));
  //       })
  //       .on("changed", function (event) {
  //         console.log("changed event", event);
  //         // remove event from local database
  //       })
  //       .on("error", function (error, receipt) {
  //         // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
  //         console.log("error", error);
  //         console.log("error receipt", receipt);
  //       });
  //   } catch (error) {
  //     dispatch(
  //       contractActions.setListeningStatus(contractAddress, {
  //         isLoading: false,
  //         isListening: false,
  //         hasError: error.message,
  //       })
  //     );
  //   }
  // };

  useEffect(() => {
    dispatch(setDashboardNav("detail"));

    // if page is loaded directly, then redux store will need to be updated because it is empty on page load
    if (!_isEqual(summaryProps, reduxDetails)) {
      dispatch(
        contractActions.setSingleContractData(
          contractAddress,
          summaryProps,
          eventsProps
        )
      );
    }
  }, []);

  // useEffect(() => {
  //   dispatch(setDashboardNav("detail"));
  //   if (isEthereumConnected && noActiveListinging(listeningStatus)) {
  //     // setContractEventListeners(contractAddress);
  //   }
  // }, [isEthereumConnected]);

  useEffect(() => {
    if (error) {
      console.log("redirecting via dispatch replace due to error: ", error);
      Router.replace("/dashboard");
    }
  }, [error]);

  return (
    <Layout layout="dashboard">
      {currentView.address && (
        <button onClick={backToDashboard}>Back to user</button>
      )}
      {typeof summaryProps !== "undefined" && (
        <>
          <ContractDetails details={summaryProps} account={coinbase.address} />
          <StatusTracker details={summaryProps} />
          <ContractActions
            details={summaryProps}
            account={coinbase.address}
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
  // Trying to fetch data from Redux store first
  try {
    const store = props.store.getState();
    const { contractDetails, contractLogs } = store;
    const details = contractDetails[address];
    const logs = contractLogs[address];
    if (!!details && !!logs) {
      return {
        contractAddress: address,
        summaryProps: details,
        eventsProps: logs,
      };
    }
  } catch (error) {
    console.log("store.getState() error: ", error.message);
  }

  // If no data in redux store, will fetch data from blockchain
  try {
    const contract = ThreeJudge(address);
    const summary = await contract.methods.getStatus().call();
    const disputeSummary = await contract.methods.getDisputeStatus().call();
    const formattedSummary = formatContractData(summary, disputeSummary);
    const logs = await contract.getPastEvents("allEvents", {
      fromBlock: 0,
    });

    return {
      contractAddress: address,
      summaryProps: formattedSummary,
      eventsProps: logs,
    };
  } catch (error) {
    // If fetch from blockchain fails due to invalid address, redirect to /dashboard
    if (typeof window === "undefined" && props.res) {
      props.res.writeHead(302, { Location: "/dashboard" });
      props.res.end();
    } else {
      return { error: error.message };
    }
  }
};

export default Contract;
