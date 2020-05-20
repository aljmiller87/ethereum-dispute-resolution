import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Ethereum
import web3 from "../../ethereum/web3";
import ThreeJudge from "../../ethereum/threejudge";

// Actions
import * as contractActions from "../../redux/actions/contractActions";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import Loader from "../../components/Loading";

// Sections
import ContractDetails from "pages-sections/Contract-Sections/ContractDetails";
import StatusTracker from "pages-sections/Contract-Sections/StatusTracker";
import ContractActions from "pages-sections/Contract-Sections/ContractActions";

// Utilities
import { formatEscrowStatus } from "../../utilities/contractHelpers";

import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const Contract = (props) => {
  const { contractAddress, contractSummary, logs, ...rest } = props;
  const instanceRef = useRef();

  // Selectors
  const { network, isEthereumConnected } = useSelector(
    (state) => state.networkReducer
  );
  const { account } = useSelector((state) => state.accountReducer);
  const { events, summary } =
    useSelector((state) => {
      return state.contractDetailReducer[contractAddress];
    }) || {};
  const currentBlockChainWriteCalls = useSelector(
    (state) => state.blockchainCallsReducer.blockchainWriteCalls
  );
  const details = summary ? formatEscrowStatus(summary) : false;

  const dispatch = useDispatch();

  const networkURL =
    network === "1"
      ? "https://etherscan.io/address/"
      : "https://rinkeby.etherscan.io/address/";

  const classes = useStyles();

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

  useEffect(() => {
    if (isEthereumConnected) {
      setContractEventListeners();
      dispatch(
        contractActions.setContractDetails(
          contractAddress,
          contractSummary,
          logs
        )
      );
    }
  }, [isEthereumConnected]);

  useEffect(() => {
    if (isEthereumConnected) {
      const getStatus = async () => {
        const instance = ThreeJudge(contractAddress);
        const updatedSummary = await instance.methods.getStatus().call();
        dispatch(
          contractActions.updateSummary(contractAddress, updatedSummary)
        );
      };
      getStatus();
    }
  }, [events]);

  return (
    <div>
      <Header
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
      />
      <Parallax filter responsive image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Contract Address</h1>
              <h4>{contractAddress}</h4>
              <br />
              <Button
                color="info"
                size="lg"
                href={`${networkURL}${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-cubes" />
                View Block Explorer
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {details && (
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
      <Footer />
      {currentBlockChainWriteCalls.findIndex(
        (address) => address === contractAddress
      ) >= 0 && <Loader />}
    </div>
  );
};
Contract.getInitialProps = async (props) => {
  const address = props.query.contract;
  const contract = ThreeJudge(address);
  const summary = await contract.methods.getStatus().call();
  const logs = await contract.getPastEvents("allEvents", {
    fromBlock: 0,
  });

  return {
    contractAddress: address,
    contractSummary: summary,
    logs,
  };
};

export default Contract;
