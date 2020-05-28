import React from "react";
import "isomorphic-fetch";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { Grid } from "@material-ui/core";
// Layout
import Layout from "../layouts";
// core components
import Parallax from "components/nextjs-material-kit/Parallax/Parallax.js";

// sections for this page
import SectionAbout from "pages-sections/Home/SectionAbout.js";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import SectionGetStarted from "pages-sections/Components-Sections/SectionGetStarted.js";

const useStyles = makeStyles(styles);

const HomePage = (props) => {
  const classes = useStyles();

  return (
    <Layout>
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
    </Layout>
  );
};

HomePage.getInitialProps = function () {};

export default HomePage;
