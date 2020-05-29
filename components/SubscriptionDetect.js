import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThreeJudge from "../ethereum/threejudge";
import web3 from "../ethereum/web3";
import { StatusEventABI, TestimonyEventABI } from "../ethereum/eventABIs";

import * as contractActions from "../redux/actions/contractActions";

const SubscriptionDetect = ({ children }) => {
  const contractList = useSelector((state) => state.accountReducer.contracts);
  const [isListening, setIsListening] = useState(false);
  const subscriptionRef = useRef();
  const dispatch = useDispatch();
  console.log("contractList", contractList);

  const initEventSubscription = () => {
    console.log("initEventSubscription ran");
    subscriptionRef.current = web3.eth
      .subscribe("logs", {
        fromBlock: "latest",
        address: [...contractList],
        // topics: ['0x12345...']
      })
      .on("connected", function (subscriptionId) {
        console.log("subscriptionId", subscriptionId);
      })
      .on("data", function (log) {
        console.log("event found", log);
        const statusEventLog = web3.eth.abi.decodeLog(
          StatusEventABI,
          log.data,
          log.topics
        );
        console.log("statusEventLog", statusEventLog);
        web3.eth.getBlock(log.blockNumber).then(({ timestamp }) => {
          statusEventLog.timestamp = timestamp;
          statusEventLog["1"] = timestamp;
          dispatch(contractActions.addEvent(log.address, statusEventLog));
          const instance = ThreeJudge(contractAddress);
          dispatch(contractActions.asyncFetchState(log.address, instance));
        });
      })
      .on("changed", function (log) {});
  };

  const cancelEventSubscription = () => {
    try {
      subscriptionRef.current.unsubscribe(function (error, success) {
        if (success) {
          console.log("Successfully unsubscribed!");
        }
      });
    } catch (error) {
      console.log("cancelEventSubscription erros: ", error.message);
    }
  };

  useEffect(() => {
    if (contractList.length > 0 && !isListening) {
      setIsListening(true);
      initEventSubscription(contractList);
    }
    return () => {
      // if (isListening) {
      //   cancelEventSubscription();
      // }
    };
  }, [contractList.length]);
  return <>{children}</>;
};

export default SubscriptionDetect;
