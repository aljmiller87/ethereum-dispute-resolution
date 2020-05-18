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

// kit core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
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

const ProfilePage = ({ data: { coinbase, contracts, ...rest } }) => {
  const profileRef = useRef();
  const accountReducer = useSelector((state) => state.accountReducer);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  let options = {};
  let avatars = new Avatars(sprites(options));
  let svg = avatars.create(coinbase);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    classes.profileImg
  );

  useEffect(() => {
    if (!accountReducer || !accountReducer.account) {
      return;
    }
    if (accountReducer.account === coinbase && !isUserLoggedIn) {
      setIsUserLoggedIn(true);
    }

    if (accountReducer.account !== coinbase && isUserLoggedIn) {
      setIsUserLoggedIn(false);
    }
  }, [accountReducer.account]);

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
        rightLinks={<HeaderLinks coinbase={coinbase ? coinbase : null} />}
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div ref={profileRef} className={imageClasses}></div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{coinbase}</h3>
                    {isUserLoggedIn && (
                      <button onClick={() => setModalOpen(true)}>
                        Create Contract
                      </button>
                    )}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      {contracts.length > 0 && (
        <ListSection>
          <ContractList
            contracts={isUserLoggedIn ? accountReducer.contracts : contracts}
          />
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
  const coinbase = props.query.account;
  const contracts = await factory.methods
    .getdeployedContracts()
    .call({}, { from: coinbase });
  return { data: { coinbase, contracts } };
};

export default ProfilePage;
