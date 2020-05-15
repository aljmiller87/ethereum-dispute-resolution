import React from "react";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
}));

const index = () => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
    >
      <CircularProgress style={{ color: "white" }} />
    </Modal>
  );
};

export default index;
