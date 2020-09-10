import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store/types";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";
import { TParams, OrderStatusEnum, OrderStatus } from "../../types";
import { createOrder, GetPropertyQueryForCart, getPropertyForCart } from "./graphql";
// components
import TwoButtons from "./components/TwoButtons";
import CartHeader from "./components/CartHeader";
import LanguageSwitch from "../../components/LanguageSwitch";
import Loader from "../../components/Loader";
import CartTotal from "./components/TotalPrice";
import CartItem from "./components/CartItem";
import ConfrimationPopup from "./components/ConfrimationPopup";
import { convertNumberToPrecision } from "../../utils/numberToPrecision";
import { mutation } from "../../utils/useMutation";
import {
  CreateOrderMutationVariables,
  CreateOrderMutation,
  GetPropertyQueryVariables,
  GetOrderQuery,
  GetOrderQueryVariables,
  Language,
} from "../../API";
import { useQuery, typedQuery } from "../../utils/useQuery";
import { validateOpeningAndTable } from "../../utils/validateOpeningAndTable";
import { addToOrders, updateOrdersItemStatus, setCurrency } from "../../store/actions";
import { Typography } from "@material-ui/core";
import { priceDisplay } from "../../utils/priceDisplay";
import Footer from "../../components/Footer";

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
  const { cart, valid, orders, currency } = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const priceTotal = convertNumberToPrecision(
    cart.reduce((prev, curr): number => prev + curr.quantity * curr.price, 0)
  );
  const { restaurantNameUrl, tableName } = useParams<TParams>();
  const { t, i18n } = useTranslation();
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
      dispatch(setCurrency(data.getProperty.currency));
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
      <CartHeader />
      <LanguageSwitch />
      <Typography align="center" variant="h4">
        {t("cart_individual_order_tab_label")}
      </Typography>

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
                  ...cart.map((item) => ({
                    name: item.i18n.name,
                    price: item.price,
                    quantity: item.quantity,
                    customerComment: item.customerComment,
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
        {cart.map((item) => (
          <CartItem
            key={item.id}
            status="ADDED_TO_CART"
            id={item.id}
            img={item.image}
            title={item.i18n.name}
            ingredients={item.i18n.description}
            price={priceDisplay(
              currency,
              item.price,
              (i18n.language as Language) || (localStorage.getItem("i18nextLng") as Language)
            )}
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
        rightDisable={cart.length < 1 || !valid}
      />

      {orders
        .filter((item) => item?.propertyName === restaurantNameUrl)
        .map((order, index) => (
          <Box className={classes.orderBox} key={index}>
            <Typography align="center" variant="h6">
              {new Date(order!.createdAt).toLocaleString()}
            </Typography>
            {order?.orderItem.map((item, itemIndex) => (
              <CartItem
                key={itemIndex}
                ingredients={null}
                quantity={item.quantity}
                img=""
                title={item.name}
                price={priceDisplay(
                  currency,
                  item.price,
                  (i18n.language as Language) || (localStorage.getItem("i18nextLng") as Language)
                )}
                status={order.status as OrderStatus}
              />
            ))}
            <CartTotal subtotal={true} price={order!.priceTotal} />
          </Box>
        ))}
      <CartTotal
        price={orders.reduce((prev, curr) => (curr?.priceTotal ? curr.priceTotal + prev : prev), 0)}
      />
      <div style={{ height: 35 }} />
      <Footer />
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
