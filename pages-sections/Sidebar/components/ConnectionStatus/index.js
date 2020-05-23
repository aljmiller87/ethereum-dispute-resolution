import React from "react";
import { useSelector } from "react-redux";

// Utitlites
import { getNetwork } from "../../../../utilities/getNetwork";

// Material
import Icon from "@material-ui/core/Icon";

// Styles
import { Wrapper, ConnectionDetail, Connected, Network } from "./styles";

const ConnectionStatus = () => {
  const { network, isEthereumConnected } = useSelector(
    (state) => state.networkReducer
  );

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
