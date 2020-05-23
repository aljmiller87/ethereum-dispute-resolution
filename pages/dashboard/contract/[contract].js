import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Ethereum
import web3 from "../../../ethereum/web3";
import ThreeJudge from "../../../ethereum/threejudge";

// Actions
import * as contractActions from "../../../redux/actions/contractActions";

// Layout
import Layout from "../../../layouts";

// Sections
import ContractDetails from "pages-sections/Contract-Sections/ContractDetails";
import StatusTracker from "pages-sections/Contract-Sections/StatusTracker";
import ContractActions from "pages-sections/Contract-Sections/ContractActions";

//Components
import Loader from "../../../components/Loading";

// Utilities
import { getNetworkURL } from "../../../utilities/getNetwork";
import { formatContractData } from "../../../utilities/contractHelpers";

const Contract = ({ contractAddress, contractData, ...rest }) => {
  const { summaryProps, eventsProps } = contractData;
  const instanceRef = useRef();

  // Selectors
  const { network, isEthereumConnected } = useSelector(
    (state) => state.networkReducer
  );
  const { account } = useSelector((state) => state.accountReducer);
  const { events, summary } =
    useSelector((state) => {
      return state.contractReducer[contractAddress];
    }) || {};
  const currentBlockChainWriteCalls = useSelector(
    (state) => state.blockchainCallsReducer.blockchainWriteCalls
  );

  const dispatch = useDispatch();

  const setContractEventListeners = () => {
    const instance = ThreeJudge(contractAddress);
    instanceRef.current = instance;

    // (instance);
    instance.events
      .allEvents({
        fromBlock: "latest",
      })
      .on("connected", function (subscriptionId) {
        console.log("connected subscriptionId", subscriptionId);
      })
      .on("data", function (event) {
        console.log("data event", event);
        dispatch(contractActions.addEvent(contractAddress, event));
        dispatch(
          contractActions.asyncFetchState(contractAddress, instanceRef.current)
        );
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
  };

  // useEffect(() => {
  //   if (isEthereumConnected) {
  //     setContractEventListeners();
  //     dispatch(
  //       contractActions.setSingleContractData(
  //         contractAddress,
  //         contractSummary,
  //         logs
  //       )
  //     );
  //   }
  // }, [isEthereumConnected]);

  return (
    <Layout layout="dashboard">
      contract detail component
      {/*{details && (
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ContractDetails details={details} account={account} />
            <StatusTracker details={details} />
            <ContractActions
              details={details}
              account={account}
              contractAddress={contractAddress}
            />
          </div>
        </div>
      )}
       {currentBlockChainWriteCalls.findIndex( 
         (address) => address === contractAddress
       ) >= 0 && <Loader />}
      */}
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
    contractData: {
      summaryProps: formattedSummary,
      eventsProps: logs,
    },
  };
};

export default Contract;
