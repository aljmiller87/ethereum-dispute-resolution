// import React, {
//     useState,
//     useEffect,
//     createContext,
//     useContext,
// } from 'react';

import Router from "next/router";

// const AccountsContext = createContext([]);

// export const AccountsProvider = (props) => {
//     const [AccountsData, setAccountsData] = useState({});

//     // useEffect(() => {
//     //     fetchAccountData()
//     //         .then(setAccountsData)
//     //         .catch((err) => {
//     //             console.log(err)
//     //         });
//     // }, []);

//     return <AccountsContext.Provider value={AccountsData, setAccountsData} {...props} />;
// };

// export const useAccountsContext = () => {
//     const context = useContext(AccountsContext);

//     if (!context) {
//         throw new Error('useAccountsContext must be used within a AccountsProvider');
//     }

//     return context;
// };

const reloadOnCoinbaseDetection = coinbase => {
  console.log("reloadOnCoinbaseDetection ran");
  if (window && window.ethereum && !coinbase) {
    console.log("want to refresh here");
    Router.replace(Router.router.route);
  }
};

export default reloadOnCoinbaseDetection;
