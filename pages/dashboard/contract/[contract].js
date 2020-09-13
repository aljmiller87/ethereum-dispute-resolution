import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import _isEqual from "lodash/isEqual";

// Ethereum
import ThreeJudge from "../../../ethereum/threejudge";

// Actions
import * as contractDetailActions from "../../../redux/actions/contractDetails";
import * as contractLogActions from "../../../redux/actions/contractLogs";
import { setDashboardView } from "../../../redux/actions/dashboardActions";

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

// Interfaces
import { contractLogProp } from "../../../types/contractLogs";
import { contractDetails } from "../../../types/contractDetails";

const Contract = ({ contractAddress, summaryProps, eventsProps, error }) => {
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
    // dispatch(setDashboardView("dashboard"));
  };

  useEffect(() => {
    dispatch(setDashboardView("detail"));

    // if page is loaded directly, then redux store will need to be updated because it is empty on page load
    if (!_isEqual(summaryProps, reduxDetails)) {
      dispatch(
        contractDetailActions.setContractState(contractAddress, summaryProps)
      );
      dispatch(contractLogActions.setPastEvents(contractAddress, eventsProps));
    }
  }, []);

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
      {Object.keys(reduxDetails).length > 0 && (
        <>
          <ContractDetails details={reduxDetails} account={coinbase.address} />
          <StatusTracker details={reduxDetails} />
          <ContractActions
            details={reduxDetails}
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
        eventsProps: logs.map((log) => {
          return { ...log, isNew: true };
        }),
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

Contract.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  summaryProps: contractDetails,
  eventsProps: PropTypes.arrayOf(contractLogProp),
  error: PropTypes.string,
  rest: PropTypes.any,
};

export default Contract;
