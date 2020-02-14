import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-identicon-sprites";

// Ethereum
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

// Utilities
import ethereumAccountDetect from "../utilities/ethereumAccountDetect";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import People from "@material-ui/icons/People";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// Sections
import CreateContract from "pages-sections/LandingPage-Sections/CreateDemoSection.js";

import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const ProfilePage = ({ data: { coinbase, contracts, ...rest } }) => {
  const profileRef = useRef();
  let options = {};
  let avatars = new Avatars(sprites(options));
  let svg = avatars.create(coinbase);
  console.log("profile page props", coinbase, contracts);
  const classes = useStyles();
  //   const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    classes.profileImg
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [sellerAddress, setSellerAddress] = useState("");
  const [contractValue, setContractValue] = useState(0);

  useEffect(() => {
    // const coinbase = props.data.coinbase ? props.data.coinbase : false;
    if (profileRef.current) {
      profileRef.current.innerHTML = svg;
    }
    ethereumAccountDetect(coinbase);
  }, []);

  const setSellerValue = e => {
    if (!e.target || !e.target.value) {
      return null;
    }
    console.log("e.target.value", e.target.value);
    setSellerAddress(e.target.value);
  };

  const setEtherValue = e => {
    if (!e.target || !e.target.value) {
      return null;
    }
    console.log("e.target.value", e.target.value);
    setContractValue(e.target.value);
  };

  // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery); [NOTE] use this pattern elsewhere
  return (
    <div>
      <Header
        color="transparent"
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks coinbase={coinbase ? coinbase : null} />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div ref={profileRef} className={imageClasses}></div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{coinbase}</h3>
                    <button onClick={() => setModalOpen(true)}>
                      Create Contract
                    </button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {contracts.length}
          </div>
        </div>
      </div>
      {contracts.length > 0 && (
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div ref={profileRef} className={imageClasses}></div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{coinbase}</h3>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              {contracts.length}
            </div>
          </div>
        </div>
      )}
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        {/* <CreateContract active={true} callback={() => console.log("hello")} /> */}
        <Card>
          <form className={classes.form}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h2>Contract Creation</h2>
              <div className={classes.socialLine}>
                <h5>
                  Action is for potential buyers. Sellers must be invited after
                  creation.
                </h5>
              </div>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText="Buyer"
                id="buyer"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  readOnly: true,
                  type: "text",
                  value: coinbase,
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText="Seller..."
                id="seller"
                value={sellerAddress}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: setSellerValue,
                  type: "text",
                  required: true,
                  autoComplete: "off",
                  placeholder: "0x00000002",
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText="Contract Value (in Ether)"
                id="ether"
                value={contractValue}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: setEtherValue,
                  required: true,
                  type: "number",
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <SvgIcon className={classes.inputIconsColor}> */}
                      <Icon className="fab fa-ethereum" />
                      {/* </SvgIcon> */}
                    </InputAdornment>
                  ),
                  autoComplete: "off"
                }}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button
                simple
                color="primary"
                size="lg"
                onClick={() => console.log("hello")}
              >
                Get started
              </Button>
            </CardFooter>
          </form>
        </Card>
        {/* <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModalOpen(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Create Contract</h4>
          <h5>Buyers Only</h5>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => setModal(false)}>Never Mind</Button>
          <Button onClick={() => setModal(false)} color="success">
            Yes
          </Button>
        </DialogActions> */}
      </Dialog>
      <Footer />
    </div>
  );
};

ProfilePage.getInitialProps = async function(props) {
  const coinbase = props.query.account;
  const contracts = await factory.methods
    .getdeployedContracts()
    .call({}, { from: coinbase });
  return { data: { coinbase, contracts } };
};

export default ProfilePage;
