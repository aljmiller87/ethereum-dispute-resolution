import React from "react";
import { useSelector } from "react-redux";

// Material
import Icon from "@material-ui/core/Icon";

// Styles
import { Wrapper, ConnectionDetail, Connected, Network } from "./styles";

const ConnectionStatus = () => {
  const { network, isEthereumConnected } = useSelector(
    (state) => state.networkReducer
  );

  const getNetwork = (id) => {
    switch (id) {
      case "1":
        return "Main";
      case "3":
        return "Ropsten";
      case "4":
        return "Rinkeby";
      case "42":
        return "Kovan";

      default:
        return "Error";
    }
  };
  return (
    <Wrapper>
      <Icon className="fab fa-ethereum" />
      <ConnectionDetail>
        <Connected>
          {isEthereumConnected ? "Connected" : "Not Connected"}
        </Connected>
        {isEthereumConnected && network && (
          <Network>{getNetwork(network)}</Network>
        )}
      </ConnectionDetail>
    </Wrapper>
  );
};

export default ConnectionStatus;
