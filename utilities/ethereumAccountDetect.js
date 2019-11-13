// import React, {
//     useState,
//     useEffect,
//     createContext,
//     useContext,
// } from 'react';

import Router from 'next/router';

// const AccountsContext = createContext([]);

// export const AccountsProvider = (props) => {
//     const [AccountsData, setAccountsData] = useState({});

//     // useEffect(() => {
//     //     fetchSurveyData()
//     //         .then(setOrganicSurveyData)
//     //         .catch((err) => {
//     //             debugLog('error', 'useNotifications.fetchNotifications() - Error fetching notifications.', err);
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


const reloadOnCoinbaseDetection = (coinbase) => {
    if (window && window.ethereum && !coinbase) {
        console.log('want to refresh here');
        Router.replace(Router.router.route);
    }
}

export default reloadOnCoinbaseDetection;
