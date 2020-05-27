import React from "react";
import { useSelector } from "react-redux";

// Components
import Loader from "components/Loading";

const ContractLoader = ({ address }) => {
  const currentBlockChainWriteCalls = useSelector(
    (state) => state.blockchainCallsReducer.blockchainWriteCalls
  );

  const contractHasActiveWriteCall = () =>
    currentBlockChainWriteCalls.findIndex(
      (address) => address === contractAddress
    );

  if (contractHasActiveWriteCall() >= 0) {
    return <Loader />;
  }
  return null;
};

export default ContractLoader;
