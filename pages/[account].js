import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-identicon-sprites';

// Ethereum
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

// Utilities
import ethereumAccountDetect from '../utilities/ethereumAccountDetect';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

const ProfilePage = (props) => {
    const profileRef = useRef();
    let options = {};
    let avatars = new Avatars(sprites(options));
    let svg = avatars.create(props.data.coinbase);
    console.log('profile page props', props);
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid,
        classes.profileImg
    );

    useEffect(() => {
        // const coinbase = props.data.coinbase ? props.data.coinbase : false;
        if (profileRef.current) {
            profileRef.current.innerHTML = svg;
        }
        ethereumAccountDetect(props.data.coinbase);
    }, [])

    // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery); [NOTE] use this pattern elsewhere
    return (
        <div>
            <Header
                color="transparent"
                brand="Arbitration Distributed"
                rightLinks={<HeaderLinks coinbase={props.data.coinbase ? props.data.coinbase : null} />}
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
                                        <h3 className={classes.title}>{props.data.coinbase}</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

ProfilePage.getInitialProps = async function (props) {
    const coinbase = props.query.account;
    const contracts = await factory.methods.getdeployedContracts().call({}, { from: coinbase });
    return { data: { coinbase, contracts } }
};

export default ProfilePage;