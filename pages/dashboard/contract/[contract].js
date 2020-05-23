import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Ethereum
import ThreeJudge from "../../../ethereum/threejudge";

// Actions
import * as contractActions from "../../../redux/actions/contractActions";

// Layout
import Layout from "../../../layouts";

// Sections
import ContractDetails from "pages-sections/Contract-Sections/ContractDetails";
import StatusTracker from "pages-sections/Contract-Sections/StatusTracker";
import ContractActions from "pages-sections/Contract-Sections/ContractActions";

// Utilities
import { getNetworkURL } from "../../../utilities/getNetwork";
import { formatContractData } from "../../../utilities/contractHelpers";
import { setContractEventListeners } from "../../../utilities/contractListeners";

const Contract = ({ addressProps, contractDataProps, ...rest }) => {
  const { summaryProps, eventsProps } = contractDataProps;
  const instanceRef = useRef();

  // Selectors
  const { network, isEthereumConnected } = useSelector(
    (state) => state.networkReducer
  );
  const { account } = useSelector((state) => state.accountReducer);
  const contractFromStore =
    useSelector((state) => {
      return state.contractReducer[addressProps];
    }) || false;
  const currentBlockChainWriteCalls = useSelector(
    (state) => state.blockchainCallsReducer.blockchainWriteCalls
  );

  console.log("contractFromStore", contractFromStore);
  // console.log("isListening", isListening);

  const dispatch = useDispatch();

  const initEventListeners = (address) => {
    let error = "PRETEST";
    try {
      setContractEventListeners(address);
    } catch (err) {
      console.log("err", err);
      error = err.messagae;
    }

    if (error === "PRETEST") {
      dispatch(contractActions.setListeningActive(address));
    }
  };

  useEffect(() => {
    if (isEthereumConnected) {
      if (!contractFromStore) {
        dispatch(
          contractActions.setSingleContractData(
            addressProps,
            summaryProps,
            eventsProps
          )
        );

        initEventListeners(addressProps);
      } else if (!contractFromStore.isListening) {
        console.log("only need to set event listeners");
      }
      // setContractEventListeners();
      // );
    }
  }, [isEthereumConnected, contractFromStore]);

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
              addressProps={addressProps}
            />
          </div>
        </div>
      )}
       {currentBlockChainWriteCalls.findIndex( 
         (address) => address === addressProps
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
    addressProps: address,
    contractDataProps: {
      summaryProps: formattedSummary,
      eventsProps: logs,
    },
  };
};

export default Contract;
