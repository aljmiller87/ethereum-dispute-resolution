import React, { createContext, useState, useEffect, useContext } from "react";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import "isomorphic-fetch";

let Context = createContext();

const Provider = props => {
  const [account, setAccount] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [network, setNetwork] = useState(null);
  const [isEthereumConnected, setIsEthereumConnected] = useState(false);

  const setEthereumEventListeners = () => {
    ethereum.on("accountsChanged", function(accounts) {
      setAccount(accounts[0].toLowerCase());
    });
    ethereum.on("networkChanged", function(accounts) {
      setNetwork(accounts);
    });
  };

  const loadAccountInfo = async () => {
    console.log("loadAccountInfo called");
    let [coinbase] = await web3.eth.getAccounts();
    const contracts = await factory.methods
      .getdeployedContracts()
      .call({}, { from: coinbase });
    coinbase = coinbase ? coinbase.toLowerCase() : null;
    setAccount(coinbase);
    setContracts(contracts);
  };

  useEffect(() => {
    if (window && window.ethereum) {
      setIsEthereumConnected(true);
      setNetwork(ethereum.networkVersion);
      setEthereumEventListeners();
      loadAccountInfo();
    }
  }, []);

  return (
    <Context.Provider
      value={{
        account,
        contracts,
        network,
        isEthereumConnected,
        loadAccountInfo
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const Consumer = Context.Consumer;

export const useEthereumContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useEthereumContext must be used within the Ethereum Provider"
    );
  }

  return context;
};

export { Provider, Consumer, Context };
