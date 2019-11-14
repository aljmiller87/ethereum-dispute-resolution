import React from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
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

// Styles
import styles from "assets/jss/sections/CreateDemoSection";
const useStyles = makeStyles(styles);

const CreateDemoSection = ({ active, callback }) => {
    const classes = useStyles({ active });


    const isFormValidated = () => {
        const etherInput = document.getElementById('ether');
        let etherValue;
        if (!etherInput) {
            return
        }
        etherValue = etherInput.value;
        console.log('etherValue', !!etherValue);
        // if (!etherRef.current || !etherRef.current.value)
    }
    const handleSubmitForm = () => {
        isFormValidated();
        // if (isFormValidated) {
        //     callback();
        // }
    }
    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                    <Card className={classes.demoStep} active={active} >
                        <form className={classes.form}>
                            <CardHeader color="primary" className={classes.cardHeader}>
                                <h4>Contract Walk Through</h4>
                                <div className={classes.socialLine}>
                                    <p>This is a simulation of the escrow and dispute resolution feature of Arbitration Distributed's contracts</p>
                                </div>
                            </CardHeader>
                            <p className={classes.divider}>This is for learning purposes only. This is not a real contract and is not connected to the Ethereum blockchain</p>
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
                                        value: "0x00000001",
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
                                    value="0x00000002"

                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        readOnly: true,
                                        type: "text",
                                        value: "0x00000002",
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
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        required: true,
                                        type: "number",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AttachMoneyIcon className={classes.inputIconsColor} />
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
                                    onClick={handleSubmitForm}>
                                    Get started
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default CreateDemoSection;
