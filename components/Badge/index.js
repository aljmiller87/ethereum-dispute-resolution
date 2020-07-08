import React from "react";
import styled, { css } from "styled-components";

const dangerBadgeStyles = css`
  color: #fff;
  background-color: #f44336;
`;

const notificationBadgeStyles = css`
  && {
    position: absolute;
    left: -4px;
    top: -4px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    text-align: center;
    padding: 0;
  }
`;

export const Badge = styled.span`
  border-radius: ${({ rounded }) => (rounded == true ? "50%" : "0.25rem")};
  display: inline-block;
  font-size: 75%;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 6px;
  padding: 0.25em 0.4em;
  text-align: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, bzox-shadow 0.15s ease-in-out;
  vertical-align: baseline;
  white-space: nowrap;

  ${({ theme }) => theme === "danger" && dangerBadgeStyles};
  ${({ type }) => type === "notificationBadge" && notificationBadgeStyles};
`;

const BadgeComponent = ({ type, theme, rounded, children }) => {
  return (
    <Badge type={type} theme={theme} rounded={rounded}>
      {children}
    </Badge>
  );
};

export default BadgeComponent;
