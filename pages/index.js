import React from "react";
import "isomorphic-fetch";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { Grid } from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

// sections for this page
import SectionAbout from "pages-sections/Components-Sections/SectionAbout.js";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import SectionGetStarted from "pages-sections/Components-Sections/SectionGetStarted.js";

const useStyles = makeStyles(styles);

const HomePage = (props) => {
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
          color: "white",
        }}
      />
      <Parallax image={require("assets/img/nextjs_header.jpg")}>
        <div className={classes.container}>
          <Grid container>
            <Grid item>
              <div className={classes.brand}>
                <h1 className={classes.title}>Arbitration Distributed</h1>
                <h3 className={classes.subtitle}>
                  Transact with confidence and trust.
                </h3>
              </div>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <SectionAbout />
      <SectionGetStarted />
      <Footer />
    </div>
  );
};

HomePage.getInitialProps = function () {};

export default HomePage;
