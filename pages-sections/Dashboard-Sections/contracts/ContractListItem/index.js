import React from "react";
import _get from "lodash/get";
import Link from "next/link";
import styled from "styled-components";

// Material Core Components
import {
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";

const ContractListItem = ({ contract }) => {
  return (
    <>
      <ListItem button>
        <Link
          href="/dashboard/contract/[contract]"
          as={`/dashboard/contract/${contract.address}`}
        >
          <StyledLink>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={contract.address} />
          </StyledLink>
        </Link>
      </ListItem>
      <Divider />
    </>
  );
};

const StyledLink = styled.a`
  align-items: center;
  display: flex;
`;

export default ContractListItem;
