// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as contractLogActions from "../redux/actions/contractLogs";

function useNotificationState(notification, forceAllRead) {
  const { address, blockHash } = notification;
  const dispatch = useDispatch();
  const reduxLogs = useSelector((state) => state.contractLogs[address]);

  if (!reduxLogs || reduxLogs.length === 0) {
    const isUnread = Object.keys(notification).includes("isNew")
      ? notification.isNew
      : true;
    return { isUnread, markAsRead: () => {} };
  }
  const logIndex = reduxLogs.findIndex((item) => item.blockHash === blockHash);
  const log = reduxLogs[logIndex];
  const { isNew = true } = log;

  const markAsRead = () => {
    if (!isNew) {
      return;
    }

    dispatch(contractLogActions.setEventStatus(address, logIndex));
  };

  if (forceAllRead) {
    markAsRead();
  }
  return { isUnread: isNew, markAsRead };
}

export default useNotificationState;
