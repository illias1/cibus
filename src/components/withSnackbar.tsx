import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useTypedSelector } from "../store/types";
import { useDispatch } from "react-redux";
import { setFeedback } from "../store/actions";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

type IwithSnackbarProps = {};

const WithSnackbar: React.FC = ({ children }) => {
  const { open, message, duration } = useTypedSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setFeedback({ open: false, message: "", duration: 1500 }));
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        className={classes.root}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
      />
      {children}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "fit-content",
    },
  })
);

export default WithSnackbar;
