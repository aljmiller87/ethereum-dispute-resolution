import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import classNames from "classnames";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-identicon-sprites";

// Ethereum
import factory from "../ethereum/factory";
// import web3 from "../ethereum/web3";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";

// kit core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

// Sections
import CreateContract from "pages-sections/Dashboard-Sections/CreateContract";
import ContractList from "pages-sections/Dashboard-Sections/ContractList";

// Styles
import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ProfilePage = ({ contracts, userAddress, ...rest }) => {
  const profileRef = useRef();
  const accountReducer = useSelector((state) => state.accountReducer);
  const { pathname } = useSelector((state) => state.router.location);
  let address = pathname === "/" ? userAddress : pathname.substr(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const contractListToWatch = isUserLoggedIn
    ? accountReducer.contracts
    : contracts;

  let options = {};
  let avatars = new Avatars(sprites(options));
  let svg = avatars.create(pathname);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    classes.profileImg
  );

  useEffect(() => {
    console.log("address", address);
    if (!accountReducer || !accountReducer.account) {
      return;
    }
    console.log("accountReducer.account", accountReducer.account);
    if (accountReducer.account === address && !isUserLoggedIn) {
      setIsUserLoggedIn(true);
    }

    if (accountReducer.account !== address && isUserLoggedIn) {
      setIsUserLoggedIn(false);
    }
  }, [accountReducer.account, address]);

  useEffect(() => {
    if (profileRef.current) {
      profileRef.current.innerHTML = svg;
    }
  }, [profileRef.current]);

  return (
    <div>
      <Header
        color="transparent"
        brand="Arbitration Distributed"
        rightLinks={
          <HeaderLinks
            coinbase={accountReducer.account ? accountReducer.account : null}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <Grid container justify="center">
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div ref={profileRef} className={imageClasses}></div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{address}</h3>
                    {isUserLoggedIn && (
                      <button onClick={() => setModalOpen(true)}>
                        Create Contract
                      </button>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {contractListToWatch.length > 0 && (
        <ListSection>
          <ContractList contracts={contractListToWatch} />
        </ListSection>
      )}
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        {isUserLoggedIn && accountReducer.account && (
          <CreateContract
            coinbase={accountReducer.account}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </Dialog>
      <Footer />
    </div>
  );
};

const ListSection = styled.section`
  padding: 60px 0;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

ProfilePage.getInitialProps = async function (props) {
  const userAddress = props.query.account;
  const contracts = await factory.methods
    .getdeployedContracts()
    .call({}, { from: userAddress });
  return { userAddress, contracts };
};

export default ProfilePage;
