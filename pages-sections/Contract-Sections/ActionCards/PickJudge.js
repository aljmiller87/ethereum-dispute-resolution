import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// Actions
import * as ContractActions from "../../../redux/actions/blockchainStatusActions";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// @material-ui/core components
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";

// Kit Components
import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Card from "components/nextjs-material-kit/Card/Card";
import CardBody from "components/nextjs-material-kit/Card/CardBody";
import CardFooter from "components/nextjs-material-kit/Card/CardFooter";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader";
import CustomInput from "components/nextjs-material-kit/CustomInput/CustomInput.js";

const PickJudge = ({ action, contractAddress }) => {
  const dispatch = useDispatch();
  const judgeInputRef = useRef();
  const [judgeAddress, setJudgeAddress] = useState("");

  const handleJudgeFieldChange = (event) => {
    setJudgeAddress(event.target.value);
  };

  const handlePickJudge = async () => {
    if (judgeAddress) {
      try {
        dispatch(ContractActions.beginBlockchainWriteCall(contractAddress));
        const [coinbase] = await web3.eth.getAccounts();
        const contractInstance = threeJudge(contractAddress);
        await contractInstance.methods
          .pickJudge(judgeAddress)
          .send({
            from: coinbase,
          }) // Wait for transaction to confirm
          .on("confirmation", (confirmationNumber, receipt) => {
            // If first confirmation...
            if (confirmationNumber === 1) {
              console.log("pick judge", receipt);
            }
          });
      } catch (err) {
        console.log("err", err);
      } finally {
        console.log("finally");
        dispatch(ContractActions.endBlockchainWriteCall(contractAddress));
      }
    }
  };
  return (
    <>
      <Card className="ActionCard">
        <form action="">
          <CardHeader color="primary">
            <Center>
              <h3>{action.name}</h3>
            </Center>
          </CardHeader>
          <CardBody className="ActionCard-Body">
            <div>{action.description}</div>
            <CustomInput
              ref={judgeInputRef}
              labelText="Address of selected judge"
              id="judgeAddress"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                onChange: handleJudgeFieldChange,
                type: "text",
                required: true,
                autoComplete: "off",
                placeholder: "0x00000002",
                value: judgeAddress,
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <Icon className="fab fa-ethereum" /> */}
                    <People />
                  </InputAdornment>
                ),
                autoComplete: "off",
              }}
            />
          </CardBody>
          <CardFooter>
            <Button simple color="primary" size="lg" onClick={handlePickJudge}>
              {action.name}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

const Center = styled.div`
  text-align: center;
`;

export default PickJudge;
