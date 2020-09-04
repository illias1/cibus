import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../store/types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";
import { TParams, OrderStatusEnum, OrderStatus } from "../../../types";
import { createOrder, GetPropertyQueryForCart, getPropertyForCart } from "../graphql";
// components
import TwoButtons from "./TwoButtons";
import Loader from "../../../components/Loader";
import CartTotal from "./TotalPrice";
import CartItem from "./CartItem";
import ConfrimationPopup from "./ConfrimationPopup";
import { convertNumberToPrecision } from "../../../utils/numberToPrecision";
import { mutation } from "../../../utils/useMutation";
import {
  CreateOrderMutationVariables,
  CreateOrderMutation,
  GetPropertyQueryVariables,
  GetOrderQuery,
  GetOrderQueryVariables,
} from "../../../API";
import { useQuery, typedQuery } from "../../../utils/useQuery";
import { validateOpeningAndTable } from "../../../utils/validateOpeningAndTable";
import { addToOrders, updateOrdersItemStatus } from "../../../store/actions";
import { Typography } from "@material-ui/core";

type IIndividualTabProps = {};

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      status
    }
  }
`;

const IndividualTab: React.FC<IIndividualTabProps> = ({ ...props }) => {
  const classes = useStyles();
  const { cart, valid, orders } = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const priceTotal = convertNumberToPrecision(
    cart
      .filter((item) => item.status === "ADDED_TO_CART")
      .reduce((prev, curr): number => prev + curr.quantity * curr.item.price, 0)
  );
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
  React.useEffect(() => {
    orders.forEach(async (order) => {
      const { query } = await typedQuery<GetOrderQuery, GetOrderQueryVariables>(getOrder, {
        id: order!.id,
      });
      console.log("query", query);
      if (query && query.getOrder) {
        dispatch(
          updateOrdersItemStatus({
            id: query.getOrder.id,
            status: query.getOrder.status as OrderStatus,
          })
        );
      }
    });
  }, []);
  return (
    <div>
      {loading && <Loader />}
      <ConfrimationPopup
        open={popupOpen}
        handleClose={handleClose}
        message={t("cart_after_order_place_message")}
        onConfirmationClick={async () => {
          const mutationResult = await mutation<CreateOrderMutation, CreateOrderMutationVariables>(
            createOrder,
            {
              input: {
                propertyName: restaurantNameUrl,
                status: OrderStatusEnum["REQUESTED_BY_CUSTOMER"],
                priceTotal: priceTotal,
                tableName,
                orderItem: [
                  ...cart
                    .filter((item) => item.status === "ADDED_TO_CART")
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
          if (mutationResult.data && mutationResult.data.createOrder) {
            dispatch(addToOrders(mutationResult.data.createOrder));
          } else {
            alert(JSON.stringify(mutationResult.error));
          }
        }}
      />
      <Box className={classes.items}>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            status={item.status}
            img={item.img}
            title={item.item.title}
            ingredients={item.item.ingredients}
            price={item.item.price}
            quantity={item.quantity}
          />
        ))}
      </Box>
      {cart.length > 0 && <CartTotal price={priceTotal} />}

      <TwoButtons
        onCLickLeft={() => {
          history.push(`/${restaurantNameUrl}/${tableName}`);
        }}
        onCLickRight={() => setpopupOpen(true)}
        leftLabel="cart_add_more"
        rightLabel="cart_place_my_order"
        rightDisable={
          cart.findIndex((item) => item.status === "ADDED_TO_CART") < 0 || !valid ? true : false
        }
      />

      {orders.map((order, index) => (
        <Box className={classes.orderBox} key={index}>
          <Typography align="center" variant="h6">
            {new Date(order!.createdAt).toLocaleString()}
          </Typography>
          {order?.orderItem.map((item, itemIndex) => (
            <CartItem
              key={itemIndex}
              quantity={item.quantity}
              img=""
              title={item.name}
              price={item.price}
              status={order.status as OrderStatus}
            />
          ))}
          <CartTotal subtotal={true} price={order!.priceTotal} />
        </Box>
      ))}
      <CartTotal
        price={orders.reduce((prev, curr) => (curr?.priceTotal ? curr.priceTotal + prev : prev), 0)}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    items: {},
    orderBox: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

export default IndividualTab;
