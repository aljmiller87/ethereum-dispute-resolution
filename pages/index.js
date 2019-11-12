import React, { useEffect } from "react";
import 'isomorphic-fetch';

import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';


// nodejs library that concatenates classes
import classNames from "classnames";
import Router from "next/router";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { Box, Grid, Paper, Typography } from "@material-ui/core";
// core components
import { container } from "assets/jss/nextjs-material-kit.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

// sections for this page
import SectionAbout from 'pages-sections/Components-Sections/SectionAbout.js';
// import SectionBasics from "pages-sections/Components-Sections/SectionBasics.js";
// import SectionNavbars from "pages-sections/Components-Sections/SectionNavbars.js";
// import SectionTabs from "pages-sections/Components-Sections/SectionTabs.js";
// import SectionPills from "pages-sections/Components-Sections/SectionPills.js";
// import SectionNotifications from "pages-sections/Components-Sections/SectionNotifications.js";
// import SectionTypography from "pages-sections/Components-Sections/SectionTypography.js";
// import SectionJavascript from "pages-sections/Components-Sections/SectionJavascript.js";
// import SectionCarousel from "pages-sections/Components-Sections/SectionCarousel.js";
// import SectionCompletedExamples from "pages-sections/Components-Sections/SectionCompletedExamples.js";
// import SectionLogin from "pages-sections/Components-Sections/SectionLogin.js";
// import SectionExamples from "pages-sections/Components-Sections/SectionExamples.js";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import SectionGetStarted from "pages-sections/Components-Sections/SectionGetStarted.js";
import Section from 'components/Section';


const useStyles = makeStyles(styles);


const HomePage = (props) => {
  console.log('page props', props);
  const classes = useStyles();

  useEffect(() => {
    if (window && window.ethereum && !props.coinbase) {
      console.log('want to refresh here');
      Router.push("/");
    }
  }, [])
  return (
    <div>
      <Header
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
      <Parallax image={require("assets/img/nextjs_header.jpg")}>
        <div className={classes.container}>
          <Grid container>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Arbitration Distributed</h1>
                <h3 className={classes.subtitle}>
                  Transact with confidence and trust.
                </h3>
              </div>
            </GridItem>
          </Grid>
        </div>
      </Parallax>
      <SectionAbout />
      <SectionGetStarted />
      <Footer />
    </div>
  );
}

// export default HomePage

HomePage.getInitialProps = async function () {
  const accounts = await web3.eth.getAccounts();
  console.log('all accounts', accounts);
  const [coinbase] = await web3.eth.getAccounts();
  const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
  console.log('coinbase', coinbase);
  return { data: { coinbase, contracts } }
};

export default HomePage;
