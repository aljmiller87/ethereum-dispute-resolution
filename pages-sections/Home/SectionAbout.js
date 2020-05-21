import React from "react";
import styled from "styled-components";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// core components
import ImageCard from "components/ImageCard/index.js";
// Components
import Section from "components/Section";

// styles
import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

const SectionAbout = () => {
  const classes = useStyles();
  return (
    <Section>
      <div className={classes.container}>
        <Grid container spacing={3} alignItems="stretch" direction="row">
          <Grid item xs={12} sm={6}>
            <ImageCard
              image={require("assets/img/homepage/blockchain.jpg")}
              subCopy="Trust without third parties"
              title="Why Blockchain?"
              copy="Blockchain is a revolutionary new technology created to solve the issue of trust in economic activity without third parties..."
              buttonText="Read More"
              buttonIcon="blockchain"
              buttonLink="/blockchain"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImageCard
              image={require("assets/img/homepage/handshake.jpg")}
              subCopy="How They Work"
              title="Arbitration Contracts"
              copy="Powered by the Ethereum blockchain, Arbitration Distributed Contracts are open source smart contract that utilize escrow and dispute resolution services without any third parties."
              buttonIcon="notes"
              buttonText="How it works?"
              buttonLink="/how-it-works"
            />
          </Grid>
          <Grid item xs={12}>
            <ImageCard
              image={require("assets/img/homepage/code.jpg")}
              subCopy="Learn More"
              title="See A Demo"
              copy="Please use the on-site demo contract that will take you through the escrow and dispute resolution steps of Abritration Distributed contracts."
              buttonText="See demo"
              buttonIcon="build"
              buttonLink="/demo"
            />
          </Grid>
        </Grid>
      </div>
    </Section>
  );
};

const StyledCol = styled(Grid)`
  flex-grow: 1 !important;
`;

export default SectionAbout;
