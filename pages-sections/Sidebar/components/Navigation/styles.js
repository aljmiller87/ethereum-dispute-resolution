import styled from "styled-components";
import { ListItem } from "@material-ui/core";

export const Wrapper = styled.div`
  font-size: 0.875rem;
  letter-spacing: 0.02857em;
  line-height: 1.75;
  padding: 0;

  > nav {
    padding: 0;
  }
`;

export const StyledListItem = styled(ListItem)`
  padding: 7px 30px 8px 20px;
  background-color: ${(props) =>
    props.isActive ? "#3f51b5 !important" : "transparent"};
  color: ${(props) =>
    props.isActive ? "#fff !important" : "inherit !important"};

  [class*="MuiListItemIcon"] {
    color: ${(props) =>
      props.isActive ? "#fff !important" : "inherit !important"};
  }
  &:hover {
    background-color: ${(props) =>
      props.isActive ? "#3f51b5 !important" : "#1d1d1d !important"};
    color: #fff !important;
    [class*="MuiListItemIcon"] {
      color: #fff !important;
    }
  }
`;

export const Title = styled.h4`
  margin: 10px 20px 20px;
  padding: 10px 0;
  border-top: 0;
  font-size: 0.6875rem;
  text-transform: uppercase;
`;
