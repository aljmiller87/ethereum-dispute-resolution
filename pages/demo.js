import React, { useState, useEffect } from "react";

// Ethereum
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

// Section
import CreateDemoContract from "pages-sections/Demo/CreateDemoSection";
import ActiveDemoContract from "pages-sections/Demo/ActiveDemoSection";

// Styles
import styles from "assets/jss/sections/CreateDemoSection";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const demoSteps = ["CREATE_CONTRACT", "ACTIVE_CONTRACT", "COMPLETE_CONTRACT"];

const Demo = (props) => {
  const [demoStep, setDemoStep] = useState(-1);
  const [contractValue, setContractValue] = useState(0);
  const classes = useStyles();
  const { ...rest } = props;

  const nextDemoStep = () => {
    console.log("nextDemoStep called");
    setDemoStep((prev) => prev + 1);
  };

  const createContract = (value) => {
    setContractValue(value);
    nextDemoStep();
  };

  useEffect(() => {
    // ethereumAccountDetect(props.data.coinbase);
    setTimeout(() => {
      nextDemoStep();
    }, 700);
  }, []);
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Arbitration Distributed"
        rightLinks={
          <HeaderLinks
            coinbase={props.data.coinbase ? props.data.coinbase : null}
          />
        }
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <CreateDemoContract
            active={demoSteps[demoStep] === "CREATE_CONTRACT"}
            callback={createContract}
          />
          <ActiveDemoContract
            active={demoSteps[demoStep] === "ACTIVE_CONTRACT"}
            callback={nextDemoStep}
          />
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

Demo.getInitialProps = async function () {
  // const [coinbase] = await web3.eth.getAccounts();
  // const contracts = await factory.methods
  //   .getdeployedContracts()
  //   .call({}, { from: coinbase });
  // return { data: { coinbase, contracts } };
};

export default Demo;
