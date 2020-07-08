import styled from "styled-components";
import Badge from "../../../Badge";

export const ListItem = styled.li`
  && {
    align-items: flex-start;
    display: flex;
    position: relative;
    padding: 20px 10px 14px;
    border-bottom: 1px solid #dee2e6;
  }
`;

export const StyledBadge = styled.div`
  && {
    background-color: #f50057;
    border-radius: 50%;
    bottom: 4px;
    height: 16px;
    line-height: 16px;
    padding: 0;
    position: absolute;
    right: 4px;
    text-align: center;
    width: 16px;
  }
`;

export const UserAvatar = styled.div`
  height: 50px !important;
  line-height: 50px;
  margin-right: 8px;
  position: relative;
  width: 50px !important;
`;

export const ItemBody = styled.div`
  flex: 1 1;

  button {
    font-size: 11px;
    svg {
      height: 10px;
      width: 10px;
    }
    span {
      margin-left: 6px;
    }
  }
`;
export const Heading = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  h5 {
    color: #252525;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    text-transform: capitalize;

    a {
      color: #3f51b5;
      cursor: pointer;
    }
  }
`;
export const SubHeading = styled.div`
  color: #808080;
  margin: 0 0 6px !important;

  p {
    font-size: 11px;
    line-height: 13px;
    margin: 0;
    &:first-child {
      font-weight: 700;
    }
  }
`;

export const Date = styled.span`
  font-size: 12px;
  color: #808080;
  display: inline-block;

  small {
    font-size: 80%;
    font-weight: 400;
  }
`;

export const ModalDataWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 90%;
  width: 90%;
  > div {
    color: #000;
    background: #fff;
    max-height: 500px;
    max-width: 700px;
    padding: 24px;
    p {
      word-wrap: break-word;
    }
  }
`;
