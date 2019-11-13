import React, { useEffect } from "react";

// Ethereum
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

// Utilities
import ethereumAccountDetect from '../utilities/ethereumAccountDetect';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People"

// components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "pages-sections/LandingPage-Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const Demo = (props) => {
  const classes = useStyles();
  const { ...rest } = props;

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    ethereumAccountDetect(props.data.coinbase);
  }, [])
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks coinbase={props.data.coinbase ? props.data.coinbase : null} />}
        fixed
        changeColorOnScroll={{
          height: 20,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter responsive image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                                                                                                                                information that can make you or your product create the first
                                                                                                                                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}> */}
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Login</h4>
                <div className={classes.socialLine}>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-facebook"} />
                  </Button>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-google-plus-g"} />
                  </Button>
                </div>
              </CardHeader>
              <p className={classes.divider}>Or Be Classical</p>
              <CardBody>
                <CustomInput
                  labelText="First Name..."
                  id="first"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                            </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg">
                  Get started
                                    </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
      {/* </div>
      </div> */}
      <Footer />
    </div>
  );
}

Demo.getInitialProps = async function () {
  const [coinbase] = await web3.eth.getAccounts();
  const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
  return { data: { coinbase, contracts } }
};

export default Demo;