import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import headerImage from "../../../assets/hero-photo.png";
import { GetPropertyQuery } from "../../../API";

type ICartHeaderProps = {
  propName: string;
  propAddress: Omit<
    NonNullable<NonNullable<GetPropertyQuery["getProperty"]>["address"]>,
    "__typename"
  > | null;
};

const CartHeader: React.FC<ICartHeaderProps> = ({ propAddress, propName }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundPositionY: "bottom",
      }}
      className={classes.root}
    >
      <Typography align="center" className={classes.text} variant="h5">
        {propName}
      </Typography>
      <Typography align="center" className={classes.text} variant="h6">
        {propAddress?.city}, {propAddress?.exact}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      height: 96,
      width: "100%",
      padding: 16,
      boxSizing: "border-box",
    },
    text: {
      color: "#fff",
    },
  })
);

export default CartHeader;
