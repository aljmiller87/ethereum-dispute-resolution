import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as networkActions from "../redux/actions/networkActions";
import * as accountActions from "../redux/actions/accountActions";
import "isomorphic-fetch";

const EthereumConnectionDetect = (props) => {
  const [isEventListenerSet, setIsEventListenerSet] = useState(false);
  const dispatch = useDispatch();

  const setEthereumEventListeners = () => {
    setIsEventListenerSet(true);
    ethereum.on("accountsChanged", function (accounts) {
      console.log("account changed!", accounts);
      dispatch(accountActions.asyncLoadAccountInfo());
    });
    ethereum.on("networkChanged", function (accounts) {
      console.log("network changed to: ", ethereum.networkVersion);
      console.log("accounts also changed!", accounts);
      dispatch(networkActions.setNetwork(ethereum.networkVersion));
      dispatch(accountActions.asyncLoadAccountInfo());
    });
  };

  useEffect(() => {
    if (!isEventListenerSet && window && window.ethereum) {
      dispatch(networkActions.setIsEthereumConnected(true));
      dispatch(networkActions.setNetwork(ethereum.networkVersion));
      dispatch(accountActions.asyncLoadAccountInfo());
      setEthereumEventListeners();
    }
  });

  return <>{props.children}</>;
};

export default EthereumConnectionDetect;
