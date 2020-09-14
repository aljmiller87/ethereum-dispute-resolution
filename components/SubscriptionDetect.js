import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

// ethereum
import web3 from "../ethereum/web3";
import ThreeJudge from "../ethereum/threejudge";

// actions
import * as contractDetailActions from "../redux/actions/contractDetails";
import * as contractLogActions from "../redux/actions/contractLogs";
import * as contractSubscribeActions from "../redux/actions/contractSubscribe";

// utilities
import { isDifferent } from "../utilities/isArrayEqual";
import decodeLog from "../utilities/decodeLog";

/* 
  TODO: Need to refactor this so subscriptions are managed on individual address basis, rather than: 1) cancelling all 2) refetching all when one contract is added 
*/

/* 
  TODO: filter contract lists based on active status
  const isActiveContract = ({ escrowState, disputeState }) => {
    return (
      escrowState !== "CANCELLED" &&
      escrowState !== "COMPLETE" &&
      disputeState !== "COMPLETE"
    );
  };
*/

const isStoreDifferent = (newArr, reduxObj) => {
  return reduxObj && isDifferent(newArr, Object.keys(reduxObj));
};

const SubscriptionDetect = ({ children }) => {
  const { contracts: coinbaseContracts } = useSelector(
    (state) => state.accountReducer.coinbase
  );
  const { contractSubscribe } = useSelector((state) => state);

  const subscriptionRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const initEventSubscription = useCallback(
    async (list) => {
      // Return early condition
      if (!list || list.length === 0) {
        return;
      }
      // Return early condition
      if (isLoading) {
        return;
      }
      setisLoading(true);
      // Setting subscriptions
      subscriptionRef.current = web3.eth
        .subscribe("logs", {
          fromBlock: "latest",
          address: [...list],
          // topics: ['0x12345...']
        })
        .on("connected", function (subscriptionId) {
          console.log("subscriptionId", subscriptionId);
          // Saving success to redux store and local state
          dispatch(
            contractSubscribeActions.setBatchListeningStatus(
              list,
              subscriptionId
            )
          );
          setisLoading(false);
        })
        .on("data", async (log) => {
          const contract = ThreeJudge(log.address);
          await contract.getPastEvents(
            "allEvents",
            {
              fromBlock: log.blockNumber - 1,
              topics: log.topics,
            },
            function (error, success) {
              if (error) {
                console.log("error is: ", error);
              }
              if (success) {
                const [event] = success;
                const temp = {
                  ...event,
                  isNew: true,
                };
                // Add events to redux store and refetch contract state to rerender dashboard/contract detail UI
                dispatch(contractLogActions.addEvent(log.address, temp));
                dispatch(contractDetailActions.asyncFetchState(log.address));
              }
            }
          );
        })
        .on("changed", function (log) {
          console.log("log changed", log);
        });
    },
    [dispatch, isLoading]
  );

  const cancelEventSubscription = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setisLoading(true);
    if (!subscriptionRef.current) {
      return;
    }
    try {
      return await subscriptionRef.current.unsubscribe(
        async (error, success) => {
          if (success) {
            dispatch(contractSubscribeActions.clearSubscriptions());
            subscriptionRef.current = null;
            setisLoading(false);
          }
        }
      );
    } catch (error) {
      // Todo UI handle error
      console.log("cancelEventSubscription error: ", error.message);
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    const handleEffect = async () => {
      // If no async request loading && redux store is not up to date with latest list
      if (
        !isLoading &&
        isStoreDifferent(coinbaseContracts, contractSubscribe)
      ) {
        // If there's already a subscription
        if (subscriptionRef.current) {
          await cancelEventSubscription();
          // If there's not active subscription && there are coinbase contracts to subscribe to
        } else if (coinbaseContracts.length > 0 && !subscriptionRef.current) {
          await initEventSubscription(coinbaseContracts);
        }
      }
    };
    handleEffect();
  }, [
    cancelEventSubscription,
    coinbaseContracts,
    contractSubscribe,
    initEventSubscription,
    isLoading,
  ]);

  useEffect(() => {
    return () => {
      console.log("CLEAN UP: calling cancelEventSubscription");
      cancelEventSubscription();
    };
  }, []);

  return <>{children}</>;
};

SubscriptionDetect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SubscriptionDetect;
