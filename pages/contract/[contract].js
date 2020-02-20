import React from "react";
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

// Context
import { useEthereumContext } from "../../context/ethereum";

// Utilities
import { formatEscrowStatus } from "../../utilities/contractHelpers";

const useStyles = makeStyles(styles);

const Contract = props => {
  const { network, account } = useEthereumContext();
  const networkURL =
    network === "1"
      ? "https://etherscan.io/address/"
      : "https://rinkeby.etherscan.io/address/";
  const classes = useStyles();
  const { contractAddress, details, ...rest } = props;

  return (
    <div>
      <Header
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "white"
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
          <ContractDetails details={details} account={account} />
          <StatusTracker details={details} />
          <ContractActions details={details} account={account} />
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};
Contract.getInitialProps = async props => {
  const address = props.query.contract;
  const campaign = ThreeJudge(address);
  const summary = await campaign.methods.getStatus().call();
  const formattedSummary = formatEscrowStatus(summary);

  return { contractAddress: address, details: formattedSummary };
};

export default Contract;
