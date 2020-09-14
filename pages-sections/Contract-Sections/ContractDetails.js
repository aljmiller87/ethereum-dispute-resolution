import React from "react";
import web3 from "../../ethereum/web3";
import Link from "next/link";

import styled from "styled-components";

// material components
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// material icons
import { People } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";

// core components
import Title from "components/Title";

// Sections
import TestimonySection from "./TestimonySection";

const ContractDetails = ({ details, account, contractAddress }) => {
  const {
    balance,
    buyer,
    seller,
    escrowState,
    disputeState,
    buyerJudge,
    buyerJudgeHasNominatedFinalJudge,
    buyerJudgeHasVotedForResolution,
    sellerJudge,
    sellerJudgeHasNominatedFinalJudge,
    sellerJudgeHasVotedForResolution,
    nominatedJudge,
    finalJudge,
    finalJudgeHasVotedForResolution,
    votesForBuyer,
    votesForSeller,
    deadline,
    awaitingParty,
  } = details;
  const ether = balance ? web3.utils.fromWei(balance, "ether") : 0;

  return (
    <Wrapper>
      <Container>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={12}>
            <Center>
              <Title type="h2">Contract Summary</Title>
            </Center>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <List component="nav" aria-labelledby="contract details">
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <Link href="/dashboard/[account]" as={`/dashboard/${buyer}`}>
                  <a>
                    <ListItemText primary="Buyer" secondary={buyer} />
                    {account === buyer && (
                      <Chip
                        label="Your role"
                        color="primary"
                        icon={<DoneIcon />}
                        variant="outlined"
                      />
                    )}
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <Link href="/dashboard/[account]" as={`/dashboard/${seller}`}>
                  <a>
                    <ListItemText primary="Seller" secondary={seller} />
                    {account === seller && (
                      <Chip
                        label="Your role"
                        color="primary"
                        icon={<DoneIcon />}
                        variant="outlined"
                      />
                    )}
                  </a>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Icon className="fab fa-ethereum" />
                </ListItemIcon>
                <ListItemText
                  primary="Contract Balance (Ether)"
                  secondary={ether}
                />
              </ListItem>
            </List>
          </Grid>
          {escrowState === "IN_DISPUTE" && (
            <Grid item xs={12} sm={12} md={6}>
              <List component="nav" aria-labelledby="contract details">
                <ListItem>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemTextWrapper>
                    <ListItemText
                      primary="Buyer's Judge"
                      secondary={
                        !buyerJudge || buyerJudge.includes("0x00000000")
                          ? "Awaiting Selection"
                          : buyerJudge
                      }
                    />
                    <ListItemText
                      secondary={`Has Nominated or Confirmed Final Judge: ${
                        buyerJudgeHasNominatedFinalJudge ||
                        !finalJudge.includes("0x00000000")
                          ? "True"
                          : "False"
                      }`}
                    />
                    <ListItemText
                      secondary={`Has Voted for Resolution: ${
                        buyerJudgeHasVotedForResolution ? "True" : "False"
                      }`}
                    />
                  </ListItemTextWrapper>
                  {account === buyerJudge && (
                    <Chip
                      label="Your role"
                      color="primary"
                      icon={<DoneIcon />}
                      variant="outlined"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemTextWrapper>
                    <ListItemText
                      primary="Seller's Judge"
                      secondary={
                        !sellerJudge || sellerJudge.includes("0x00000000")
                          ? "Awaiting Selection"
                          : sellerJudge
                      }
                    />
                    <ListItemText
                      secondary={`Has Nominated or Confirmed Final Judge: ${
                        sellerJudgeHasNominatedFinalJudge ||
                        !finalJudge.includes("0x00000000")
                          ? "True"
                          : "False"
                      }`}
                    />
                    <ListItemText
                      secondary={`Has Voted for Resolution: ${
                        sellerJudgeHasVotedForResolution ? "True" : "False"
                      }`}
                    />
                  </ListItemTextWrapper>
                  {account === sellerJudge && (
                    <Chip
                      label="Your role"
                      color="primary"
                      icon={<DoneIcon />}
                      variant="outlined"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemTextWrapper>
                    {!finalJudge || finalJudge.includes("0x00000000") ? (
                      <ListItemText
                        primary="Nominated Final Judge"
                        secondary={
                          nominatedJudge.includes("0x00000000")
                            ? "Awaiting Nomination"
                            : sellerJudge
                        }
                      />
                    ) : (
                      <ListItemText
                        primary="Final Judge"
                        secondary={finalJudge}
                      />
                    )}
                    <ListItemText
                      secondary={`Has Voted for Resolution: ${
                        finalJudgeHasVotedForResolution ? "True" : "False"
                      }`}
                    />
                  </ListItemTextWrapper>
                  {account === finalJudge && (
                    <Chip
                      label="Your role"
                      color="primary"
                      icon={<DoneIcon />}
                      variant="outlined"
                    />
                  )}
                </ListItem>
              </List>
            </Grid>
          )}
          <Grid item xs={12}>
            <TestimonySection contractAddress={contractAddress} />
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: #999;
  padding: 40px 0;
  @media (min-width: 576px) {
    padding: 50px 0;
  }
  @media (min-width: 768px) {
    padding: 60px 0;
  }
  @media (min-width: 992px) {
    padding: 70px 0;
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ListItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin: 0;
  }
`;

export default ContractDetails;
