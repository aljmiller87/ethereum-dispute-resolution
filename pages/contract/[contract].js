import React, { useState } from "react";
import { useSelector } from "react-redux";
// Ethereum
import web3 from "../../ethereum/web3";
import ThreeJudge from "../../ethereum/threejudge";

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

import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "pages-sections/LandingPage-Sections/WorkSection.js";

// Sections
import ContractDetails from "pages-sections/Contract-Sections/ContractDetails";
import StatusTracker from "pages-sections/Contract-Sections/StatusTracker";
import ContractActions from "pages-sections/Contract-Sections/ContractActions";

// Utilities
import { formatEscrowStatus } from "../../utilities/contractHelpers";

const useStyles = makeStyles(styles);

const Contract = (props) => {
  const { contractAddress, details, contract, ...rest } = props;
  const [contractDetails, setContractDetails] = useState(details);
  const { network } = useSelector((state) => state.networkReducer);
  const { account } = useSelector((state) => state.accountReducer);
  const networkURL =
    network === "1"
      ? "https://etherscan.io/address/"
      : "https://rinkeby.etherscan.io/address/";
  const classes = useStyles();

  const fetchLatestContractDetails = async () => {
    console.log("refetching data");
    const summary = await contract.methods.getStatus().call();
    const formattedSummary = formatEscrowStatus(summary);
    setContractDetails(formattedSummary);
  };

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
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ContractDetails details={contractDetails} account={account} />
          <StatusTracker details={contractDetails} />
          <ContractActions
            details={contractDetails}
            account={account}
            contractAddress={contractAddress}
            onSuccessfulCall={fetchLatestContractDetails}
          />
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};
Contract.getInitialProps = async (props) => {
  const address = props.query.contract;
  const contract = ThreeJudge(address);
  const summary = await contract.methods.getStatus().call();
  const formattedSummary = formatEscrowStatus(summary);

  return { contractAddress: address, details: formattedSummary, contract };
};

export default Contract;
