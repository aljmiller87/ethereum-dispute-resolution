import React, { useEffect } from "react";
import { useRouter } from 'next/router';

// Ethereum
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

// Utilities
import ethereumAccountDetect from '../utilities/ethereumAccountDetect';

// nodejs library that concatenates classes
import classNames from "classnames";
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

import profile from "assets/img/faces/christian.jpg";


import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

const ProfilePage = (props) => {
    console.log('profile page props', props);
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    useEffect(() => {
        // const coinbase = props.data.coinbase ? props.data.coinbase : false;
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
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>Christian Louboutin</h3>
                                        <h6>DESIGNER</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-twitter"} />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-instagram"} />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-facebook"} />
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                An artist of considerable range, Chet Faker — the name taken by
                                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
                            </p>
                        </div>
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