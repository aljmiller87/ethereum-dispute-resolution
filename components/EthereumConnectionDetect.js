import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as networkActions from "../redux/actions/networkActions";
import * as accountActions from "../redux/actions/accountActions";

const EthereumConnectionDetect = (props) => {
  const [isEventListenerSet, setIsEventListenerSet] = useState(false);
  const dispatch = useDispatch();

  const setEthereumEventListeners = () => {
    setIsEventListenerSet(true);
    ethereum.on("accountsChanged", function (accounts) {
      dispatch(accountActions.asyncLoadCoinbaseInfo());
    });
    ethereum.on("networkChanged", function (accounts) {
      dispatch(networkActions.setNetwork(ethereum.networkVersion));
      dispatch(accountActions.asyncLoadCoinbaseInfo());
    });
  };

  useEffect(() => {
    if (!isEventListenerSet && window && window.ethereum) {
      dispatch(networkActions.setIsEthereumConnected(true));
      dispatch(networkActions.setNetwork(ethereum.networkVersion));
      dispatch(accountActions.asyncLoadCoinbaseInfo());
      setEthereumEventListeners();
    }
  }, []);

  return <>{props.children}</>;
};

export default EthereumConnectionDetect;
