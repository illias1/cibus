import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../store/types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";
import { TParams } from "../../../types";
// components
import TwoButtons from "./TwoButtons";
import CartTotal from "./TotalPrice";
import CartItem from "./CartItem";
import ConfrimationPopup from "./ConfrimationPopup";
import { setCartItemsStatus } from "../../../store/actions";
import { convertNumberToPrecision } from "../../../utils/numberToPrecision";

type IIndividualTabProps = {};

const IndividualTab: React.FC<IIndividualTabProps> = ({ ...props }) => {
  const classes = useStyles();
  const cartItems = useTypedSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId, tableNumber } = useParams<TParams>();
  const { t } = useTranslation();
  const [open, setopen] = React.useState<boolean>(false);
  const handleClose = () => {
    setopen(false);
  };
  return (
    <div>
      <ConfrimationPopup
        open={open}
        handleClose={handleClose}
        message={t("cart_after_order_place_message")}
        onConfirmationClick={() => {
          dispatch(setCartItemsStatus("placed"));
        }}
      />
      <Box className={classes.items}>
        {cartItems.map((item) => (
          <CartItem
            status={item.status}
            img={item.img}
            title={item.item.title}
            ingredients={item.item.ingredients}
            price={item.item.price}
            quantity={item.quantity}
          />
        ))}
      </Box>
      <CartTotal
        price={convertNumberToPrecision(
          cartItems.reduce((prev, curr): number => prev + curr.quantity * curr.item.price, 0)
        )}
      />

      <TwoButtons
        onCLickLeft={() => {
          history.push(`/${restaurantId}/${tableNumber}`);
        }}
        onCLickRight={() => setopen(true)}
        leftLabel="cart_add_more"
        rightLabel="cart_place_my_order"
        rightDisable={cartItems.findIndex((item) => item.status === "added") < 0 ? true : false}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    items: {},
  })
);

export default IndividualTab;
