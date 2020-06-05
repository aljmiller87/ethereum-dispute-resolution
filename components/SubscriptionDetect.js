import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThreeJudge from "../ethereum/threejudge";
import web3 from "../ethereum/web3";
import * as contractDetailActions from "../redux/actions/contractDetails";
import * as contractLogActions from "../redux/actions/contractLogs";
import * as contractSubscribeActions from "../redux/actions/contractSubscribe";

/* 
  TODO: Need to refactor this so subscriptions are managed on individual address basis, rather than: 1) cancelling all 2) refetching all when one contract is added 
*/

const SubscriptionDetect = ({ children }) => {
  // const contractList = useSelector((state) => state.accountReducer.contracts);
  // const [isListening, setIsListening] = useState(false);
  // const subscriptionRef = useRef();
  // const dispatch = useDispatch();

  // const initEventSubscription = () => {
  //   subscriptionRef.current = web3.eth
  //     .subscribe("logs", {
  //       fromBlock: "latest",
  //       address: [...contractList],
  //       // topics: ['0x12345...']
  //     })
  //     .on("connected", function (subscriptionId) {
  //       console.log("subscriptionId", subscriptionId);
  //       dispatch(
  //         contractSubscribeActions.setBatchListeningStatus(
  //           contractList,
  //           subscriptionId
  //         )
  //       );
  //     })
  //     .on("data", function (log) {
  //       dispatch(contractLogActions.addEvent(log.address, log));
  //       dispatch(contractDetailActions.asyncFetchState(log.address));
  //     })
  //     .on("changed", function (log) {
  //       console.log("log changed", log);
  //     });
  // };

  // const cancelEventSubscription = () => {
  //   try {
  //     subscriptionRef.current.unsubscribe(function (error, success) {
  //       if (success) {
  //         console.log("Successfully unsubscribed!");
  //         setIsListening(false);
  //       }
  //     });
  //   } catch (error) {
  //     console.log("cancelEventSubscription error: ", error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (contractList.length === 0 && isListening) {
  //     cancelEventSubscription();
  //   }
  //   if (contractList.length > 0 && !isListening) {
  //     // Contracts are found and no previous listening state subscribed
  //     setIsListening(true);
  //     initEventSubscription(contractList);
  //   }
  //   if (contractList.length > 0 && isListening) {
  //     // Cancel current subscription and create new subscription based on updated contract list
  //     cancelEventSubscription();
  //     initEventSubscription(contractList);
  //   }
  //   return () => {
  //     if (isListening) {
  //       cancelEventSubscription();
  //     }
  //   };
  // }, [contractList.length]);
  return <>{children}</>;
};

export default SubscriptionDetect;
