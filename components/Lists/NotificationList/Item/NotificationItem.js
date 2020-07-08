import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";

// Utilities
import parseCamelCase from "../../../../utilities/parseCamelCase";
import parseTimeStamp from "../../../../utilities/parseTimeStamp";

// Interfaces
import { contractLogProp } from "../../../../types/contractLogs";

import {
  ListItem,
  ItemBody,
  Heading,
  SubHeading,
  Date,
  ModalDataWrapper,
  StyledBadge,
} from "./styles";
import useNotificationState from "../../../../hooks/useNotificationState";

const NotificationItem = ({ notification, forceAllRead }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isUnread, markAsRead } = useNotificationState(
    notification,
    forceAllRead
  );
  const { address, returnValues, event } = notification;
  const { functionCalled = "", timestamp = "" } = returnValues;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const initModal = (e) => {
    e.preventDefault();
    markAsRead();
    setIsModalOpen(true);
  };

  return (
    <>
      <ListItem isUnread={isUnread}>
        <ItemBody>
          <Heading>
            <h5>
              {event === "StatusEvent" && (
                <span>
                  Function called:&nbsp;{parseCamelCase(functionCalled)}
                </span>
              )}
              {event === "TestimonyEvent" && (
                <span>Function called:&nbsp;Testimony Submitted</span>
              )}
            </h5>
            <Date>
              <small>{parseTimeStamp(timestamp)}</small>
            </Date>
          </Heading>
          <SubHeading className="sub-heading">
            <p>Contract Address:</p>
            <p>{address}</p>
          </SubHeading>
          <Link
            href="/dashboard/contract/[contract]"
            as={`/dashboard/contract/${address}`}
          >
            <Button onClick={() => markAsRead()}>
              <ReplyIcon />
              <span>See Contract</span>
            </Button>
          </Link>
          <Button onClick={initModal}>
            <ReplyIcon />
            <span>See Log</span>
          </Button>
          {isUnread && (
            <Button onClick={() => markAsRead()}>Mark as Read</Button>
          )}
        </ItemBody>
        {isUnread && <StyledBadge />}
      </ListItem>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isModalOpen}
        onClose={handleClose}
      >
        <ModalDataWrapper>
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(notification, null, 4),
              }}
            />
          </div>
        </ModalDataWrapper>
      </Modal>
    </>
  );
};

NotificationItem.propTypes = {
  notification: contractLogProp,
  forceAllRead: PropTypes.bool.isRequired,
};

export default NotificationItem;
