/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Grid from "@material-ui/core/Grid";

import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Section from "components/Section";
// core components
import styles from "assets/jss/sections/SectionGetStarted.js";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionGetStarted() {
  const classes = useStyles();
  return (
    <Section className={classes.section} theme="dark">
      <div className={classes.container}>
        <Grid container className={classes.textCenter} justify="center">
          <Grid item xs={12} sm={12} md={8}>
            <Typography component="span" variant="subtitle1">
              Get Started
            </Typography>
            <h2>Create Your Contract</h2>
            <h4>
              Cause if you do, it can be yours for FREE. Hit the buttons below
              to navigate to our website where you can find the kit. We also
              have the Bootstrap 4 version on plain HTML. Start a new project or
              give an old Bootstrap project a new look!
            </h4>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Button color="primary" size="lg" href="/create" target="_blank">
              Create Your Contract
            </Button>
          </Grid>
        </Grid>
      </div>
    </Section>
  );
}
