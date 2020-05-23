import React from "react";
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
          as={`/dashboard/contract/${contract}`}
        >
          <StyledLink>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={contract} />
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
