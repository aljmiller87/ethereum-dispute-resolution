/*eslint-disable*/
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import Button from "components/nextjs-material-kit/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const accountReducer = useSelector((state) => state.accountReducer);
  const userAddress = accountReducer.account ? accountReducer.account : "";
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="download"
          title="Click to view source code"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://www.github.com/aljmiller87"
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <CloudDownload className={classes.icons} /> Open Source
          </Button>
        </Tooltip>
      </ListItem>
      {accountReducer.account && (
        <ListItem className={classes.listItem}>
          <Link href="/dashboard/[account]" as={`/dashboard/${userAddress}`}>
            <a style={{ color: "inherit" }}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <Apps className={classes.icons} /> Dashboard
              </Button>
            </a>
          </Link>
        </ListItem>
      )}
    </List>
  );
}
