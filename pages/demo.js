import React, { useState, useEffect } from "react";

// Ethereum
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

// Utilities
import ethereumAccountDetect from '../utilities/ethereumAccountDetect';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

// Section
import CreateDemoContract from 'pages-sections/LandingPage-Sections/CreateDemoSection';

// Styles
import styles from 'assets/jss/sections/CreateDemoSection';

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const demoSteps = ['CREATE_CONTRACT', 'ACTIVE_CONTRACT', 'COMPLETE_CONTRACT'];

const Demo = (props) => {
  const [demoStep, setDemoStep] = useState(-1);
  const classes = useStyles();
  const { ...rest } = props;

  const nextDemoStep = () => {
    console.log('nextDemoStep called')
    setDemoStep(prev => prev + 1);
  }

  useEffect(() => {
    ethereumAccountDetect(props.data.coinbase);
    setTimeout(() => {
      nextDemoStep();
    }, 700);
  }, [])
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks coinbase={props.data.coinbase ? props.data.coinbase : null} />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <CreateDemoContract
          active={demoSteps[demoStep] === 'CREATE_CONTRACT'}
          callback={nextDemoStep}
        />
        <Footer whiteFont />
      </div>
    </div>
  );
}


Demo.getInitialProps = async function () {
  const [coinbase] = await web3.eth.getAccounts();
  const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
  return { data: { coinbase, contracts } }
};

export default Demo;