import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as networkActions from "../redux/actions/networkActions";
import * as accountActions from "../redux/actions/accountActions";

const EthereumConnectionDetect = ({ children }) => {
  const [isEventListenerSet, setIsEventListenerSet] = useState(false);
  const dispatch = useDispatch();

  const setEthereumEventListeners = useCallback(() => {
    setIsEventListenerSet(true);
    ethereum.on("accountsChanged", function (accounts) {
      dispatch(accountActions.asyncLoadCoinbaseInfo());
    });
    ethereum.on("chainChanged", function (accounts) {
      dispatch(networkActions.setNetwork(ethereum.networkVersion));
      dispatch(accountActions.asyncLoadCoinbaseInfo());
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isEventListenerSet && window && window.ethereum) {
      dispatch(networkActions.setIsEthereumConnected(true));
      dispatch(networkActions.setNetwork(ethereum.networkVersion));
      dispatch(accountActions.asyncLoadCoinbaseInfo());
      setEthereumEventListeners();
    }
  }, [dispatch, isEventListenerSet, setEthereumEventListeners]);

  return <>{children}</>;
};

EthereumConnectionDetect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default EthereumConnectionDetect;
