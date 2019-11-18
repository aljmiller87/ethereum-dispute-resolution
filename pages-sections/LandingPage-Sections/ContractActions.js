import React from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// Kit Components
import CustomInput from "components/CustomInput/CustomInput.js";

// Contract Config
import { EscrowSteps, EscrowActions, DisputeSteps, DisputeActions } from 'components/config/contract.js';

const ContractActions = ({ activeEscrowStep, activeDisputeStep }) => {
    const currentEscrowStep = EscrowSteps[activeEscrowStep].state;
    const currentActions = Object.keys(EscrowActions[currentEscrowStep]);
    const actionableUsers = currentActions.forEach(action => {

    })
    console.log('currentActions', currentActions);
    return (
        <div>
            {activeEscrowStep === 0 && (
                <div>
                    <h3>Buyer Actions</h3>
                    <CustomInput
                        labelText="Confirm Payment"
                        id="ether"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            required: true,
                            type: "number",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="fab fa-ethereum" />
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default ContractActions;