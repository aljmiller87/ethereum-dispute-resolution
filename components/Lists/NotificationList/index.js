import React from "react";
import PropTypes from "prop-types";

import NotificationItem from "./Item/NotificationItem";
import CustomScrollbars from "../../CustomScrollbars";
import { UnstyledList } from "../../Lists/Unstyled/styles";

// Interfaces
import { contractLogProp } from "../../../types/contractLogs";

const MailNotification = ({ notifications, forceAllRead }) => {
  return (
    <CustomScrollbars style={{ height: 280 }}>
      <UnstyledList>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            notification={notification}
            forceAllRead={forceAllRead}
          />
        ))}
      </UnstyledList>
    </CustomScrollbars>
  );
};

export default MailNotification;

MailNotification.propTypes = {
  notifications: PropTypes.arrayOf(contractLogProp).isRequired,
  forceAllRead: PropTypes.bool.isRequired,
};
