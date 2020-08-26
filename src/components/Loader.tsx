import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

type ILoaderProps = {
  open?: boolean;
  onClick?: () => void;
};

const Loader: React.FC<ILoaderProps> = ({ open = true, onClick }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClick}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default Loader;
