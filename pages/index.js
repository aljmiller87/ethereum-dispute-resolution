import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { Box, Grid, Paper, Typography } from "@material-ui/core";
// core components
import { container, section } from "assets/jss/nextjs-material-kit.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ImageCard from "components/ImageCard/index.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";

// sections for this page
import SectionBasics from "pages-sections/Components-Sections/SectionBasics.js";
import SectionNavbars from "pages-sections/Components-Sections/SectionNavbars.js";
import SectionTabs from "pages-sections/Components-Sections/SectionTabs.js";
import SectionPills from "pages-sections/Components-Sections/SectionPills.js";
import SectionNotifications from "pages-sections/Components-Sections/SectionNotifications.js";
import SectionTypography from "pages-sections/Components-Sections/SectionTypography.js";
import SectionJavascript from "pages-sections/Components-Sections/SectionJavascript.js";
import SectionCarousel from "pages-sections/Components-Sections/SectionCarousel.js";
import SectionCompletedExamples from "pages-sections/Components-Sections/SectionCompletedExamples.js";
import SectionLogin from "pages-sections/Components-Sections/SectionLogin.js";
import SectionExamples from "pages-sections/Components-Sections/SectionExamples.js";

import Router from "next/router";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import SectionGetStarted from "pages-sections/Components-Sections/SectionGetStarted.js";


const useStyles = makeStyles(styles);


const HomePage = () => {
  const classes = useStyles();
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
      <Box section>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ImageCard
                image={require('assets/img/homepage/blockchain.jpg')}
                subCopy="subCopy"
                title="Title"
                copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
                buttonText="why blockchain?"
                buttonIcon="blockchain"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImageCard
                image={require('assets/img/homepage/handshake.jpg')}
                subCopy="subCopy"
                title="Title"
                copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
                buttonIcon="notes"
                buttonText="How it works?"
              />
            </Grid>
            <Grid item xs={12}>
              <ImageCard
                image={require('assets/img/homepage/code.jpg')}
                subCopy="subCopy"
                title="Title"
                copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
                buttonText="See demo"
                buttonIcon="build"
              />
            </Grid>
          </Grid>
        </div>
      </Box>
      <SectionGetStarted />
    </div>
  );
}

export default HomePage