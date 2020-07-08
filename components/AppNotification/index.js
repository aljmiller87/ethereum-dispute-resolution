import React, { useState, Element } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Menu } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NotificationList from "components/Lists/NotificationList";
import useNotifications from "../../hooks/useNotifications";

const AppNotification = ({ anchorEl, handleClose, subHeading }) => {
  const { sortedNotifications } = useNotifications();
  const [forceAllRead, setForceAllRead] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!forceAllRead) {
      setForceAllRead(true);
    }
  };

  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Wrapper>
        <Heading>
          <div>
            <Title>Notifications</Title>
            {subHeading && <p className="sub-heading">{subHeading}</p>}
          </div>

          <Button onClick={handleClick}>Mark All As Read</Button>
        </Heading>
        <div style={{ padding: "0 10px" }}>
          <NotificationList
            notifications={sortedNotifications}
            forceAllRead={forceAllRead}
          />
        </div>
      </Wrapper>
    </Menu>
  );
};

AppNotification.propTypes = {
  anchorEl: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  handleClose: PropTypes.func.isRequired,
  subHeading: PropTypes.string,
};

export const Wrapper = styled.div`
  padding: 5px 0;
  width: 350px;
`;

export const Heading = styled.div`
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.h3`
  color: #252525;
  font-size: 17px;
  font-weight: 400;
  margin: 0 0 0.15625rem;
  margin: -5px -10px 0;
  padding: 10px 10px 0 20px;
  z-index: 10;
`;

export default AppNotification;
