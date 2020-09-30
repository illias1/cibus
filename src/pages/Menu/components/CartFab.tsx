import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import { useTypedSelector } from "../../../store/types";
import { useHistory } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { analyticsCheckout } from "../utils";

type ICartFabProps = {
  restaurantNameUrl: string;
  tableName: string;
};

const CartFab: React.FC<ICartFabProps> = ({ restaurantNameUrl, tableName }) => {
  const cartItems = useTypedSelector((state) => state.cart);
  const history = useHistory();

  const classes = useStyles();
  return (
    <Badge className={classes.cartFAB} badgeContent={cartItems.length} color="primary">
      <Fab
        onClick={() => {
          analyticsCheckout(cartItems, 1);
          history.push(`/${restaurantNameUrl}/${tableName}/cart`);
        }}
        color="secondary"
        aria-label="add"
      >
        <ShoppingBasketIcon />
      </Fab>
    </Badge>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartFAB: {
      position: "fixed",
      bottom: 75,
      right: "12px",
      zIndex: 2,
    },
  })
);

export default CartFab;
