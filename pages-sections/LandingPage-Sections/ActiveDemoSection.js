import React, { useState } from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import People from "@material-ui/icons/People";

// Kit Components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import StatusTracker from 'pages-sections/LandingPage-Sections/StatusTracker.js';

// Styles
import styles from "assets/jss/sections/CreateDemoSection";

// Contract Config
import { EscrowSteps, EscrowActions, DisputeSteps, DisputeActions } from 'components/config/contract.js';

const useStyles = makeStyles(styles);

const ActiveDemoSection = ({ active, callback }) => {
  console.log('EscrowSteps', EscrowSteps);
  const classes = useStyles({ active });
  const [escrowStep, setEscrowStep] = useState('hello');



  return (
    <div className={classes.demoStep} active={active}>
      <GridContainer justify="center">
        <GridItem xs={12}>
          <StatusTracker steps={EscrowSteps} />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>{escrowStep}</h4>
                <div className={classes.socialLine}>
                  <p>This is a simulation of the escrow and dispute resolution feature of Arbitration Distributed's contracts</p>
                </div>
              </CardHeader>
              <p className={classes.divider}>Card divider</p>
              <CardBody>
                Card body
                            </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  simple
                  color="primary"
                  size="lg"
                  onClick={() => console.log('hello')}>
                  Get started
                                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  )
}

export default ActiveDemoSection;
