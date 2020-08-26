import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../store/types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";
import { TParams, OrderStatus } from "../../../types";
import { createOrder, GetPropertyQueryForCart, getPropertyForCart } from "../graphql";
// components
import TwoButtons from "./TwoButtons";
import Loader from "../../../components/Loader";
import CartTotal from "./TotalPrice";
import CartItem from "./CartItem";
import ConfrimationPopup from "./ConfrimationPopup";
import { setCartItemsStatus } from "../../../store/actions";
import { convertNumberToPrecision } from "../../../utils/numberToPrecision";
import { mutation } from "../../../utils/useMutation";
import {
  CreateOrderMutationVariables,
  CreateOrderMutation,
  GetPropertyQueryVariables,
} from "../../../API";
import { useQuery } from "../../../utils/useQuery";
import { validateOpeningAndTable } from "../../../utils/validateOpeningAndTable";

type IIndividualTabProps = {};
const PENDING: OrderStatus = "AWAITING";

const IndividualTab: React.FC<IIndividualTabProps> = ({ ...props }) => {
  const classes = useStyles();
  const { cart, valid } = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantNameUrl, tableName } = useParams<TParams>();
  const { t } = useTranslation();
  const [popupOpen, setpopupOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setpopupOpen(false);
  };
  const { data, loading } = useQuery<GetPropertyQueryForCart, GetPropertyQueryVariables>(
    getPropertyForCart,
    { name: restaurantNameUrl }
  );
  React.useEffect(() => {
    if (data.getProperty) {
      validateOpeningAndTable(tableName, data, dispatch, t);
    }
  }, [data]);
  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <div>
      {loading && <Loader />}
      <ConfrimationPopup
        open={popupOpen}
        handleClose={handleClose}
        message={t("cart_after_order_place_message")}
        onConfirmationClick={async () => {
          await mutation<CreateOrderMutation, CreateOrderMutationVariables>(
            createOrder,
            {
              input: {
                propertyName: restaurantNameUrl,
                status: PENDING,
                tableName,
                orderItem: [
                  ...cart
                    .filter((item) => item.status !== "placed")
                    .map((item) => ({
                      name: item.item.title,
                      price: item.item.price,
                      quantity: item.quantity,
                    })),
                ],
              },
            },
            "AWS_IAM"
          );
          dispatch(setCartItemsStatus("placed"));
        }}
      />
      <Box className={classes.items}>
        {cart.map((item) => (
          <CartItem
            key={item.item.title}
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
          cart.reduce((prev, curr): number => prev + curr.quantity * curr.item.price, 0)
        )}
      />

      <TwoButtons
        onCLickLeft={() => {
          history.push(`/${restaurantNameUrl}/${tableName}`);
        }}
        onCLickRight={() => setpopupOpen(true)}
        leftLabel="cart_add_more"
        rightLabel="cart_place_my_order"
        rightDisable={
          cart.findIndex((item) => item.status === "added") < 0 || !valid ? true : false
        }
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
