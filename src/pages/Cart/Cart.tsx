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
import ScrollToTop from "./components/ScrollToTop";
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
import { addToOrders, updateOrdersItemStatus, setPropertyFromCart } from "../../store/actions";
import { Typography } from "@material-ui/core";
import { priceDisplay } from "../../utils/priceDisplay";
import Footer from "../../components/Footer";
import { LOCAL_STORAGE_CUSTOMER_NAME } from "../../utils/_constants";
import { analyticsRemoveFromCart, analyticsPurchase } from "./utils";
import CallStuffFab from "../../components/CallStuffFab";
import { analyticsCheckout } from "../Menu/utils";
import Social from "./components/Social";

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
  const {
    cart,
    valid,
    orders,
    property: { address, NonUniqueName, currency, info },
    initialized,
  } = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const priceTotal = cart.reduce(
    (prev, curr): number => prev + curr.quantity * (curr.price + curr.optionsTotalPrice),
    0
  );
  const { restaurantNameUrl, tableName } = useParams<TParams>();
  const { t, i18n } = useTranslation();
  const [popupOpen, setpopupOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setpopupOpen(false);
  };
  const { data, loading } = useQuery<GetPropertyQueryForCart, GetPropertyQueryVariables>(
    getPropertyForCart,
    { name: restaurantNameUrl },
    !initialized
  );
  React.useEffect(() => {
    console.log("data", data);
    if (data.getProperty) {
      validateOpeningAndTable(tableName, data, dispatch, t);
      dispatch(setPropertyFromCart(data.getProperty));
      // dispatch(setCurrency(data.getProperty.currency));
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
  const atLeastOneSocialLink = info?.Facebook || info?.Instagram;
  return (
    <div>
      <ScrollToTop />
      <CartHeader propAddress={address} propName={NonUniqueName} />
      <CallStuffFab restaurantNameUrl={restaurantNameUrl} tableName={tableName} />
      <LanguageSwitch />
      <Typography align="center" variant="h4">
        {t("cart_individual_order_tab_label")}
      </Typography>

      {loading && <Loader />}
      <ConfrimationPopup
        open={popupOpen}
        handleClose={handleClose}
        message={t("cart_after_order_place_message")}
        onConfirmationClick={async ({ customerName }) => {
          localStorage.setItem(LOCAL_STORAGE_CUSTOMER_NAME, customerName);
          const mutationResult = await mutation<CreateOrderMutation, CreateOrderMutationVariables>(
            createOrder,
            {
              input: {
                propertyName: restaurantNameUrl,
                status: OrderStatusEnum["REQUESTED_BY_CUSTOMER"],
                priceTotal: priceTotal,
                tableName,
                customerName,
                orderItem: [
                  ...cart.map((item) => ({
                    name: item.i18n.name,
                    id: item.id,
                    price: item.price,
                    quantity: item.quantity,
                    customerComment: item.customerComment,
                    options: item.options,
                    optionsTotalPrice: item.optionsTotalPrice,
                  })),
                ],
              },
            },
            "AWS_IAM"
          );
          if (mutationResult.data && mutationResult.data.createOrder) {
            dispatch(addToOrders(mutationResult.data.createOrder));
            analyticsPurchase(mutationResult.data.createOrder);
          } else {
            alert(JSON.stringify(mutationResult.error));
          }
          handleClose();
        }}
      />
      <Box className={classes.items}>
        {cart.map((item) => (
          <CartItem
            analyticsFn={() => analyticsRemoveFromCart(item)}
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
        onCLickRight={() => {
          analyticsCheckout(cart, 2);
          setpopupOpen(true);
        }}
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
                id={item.id}
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
      {orders.length > 0 && (
        <CartTotal
          price={orders.reduce(
            (prev, curr) => (curr?.priceTotal ? curr.priceTotal + prev : prev),
            0
          )}
        />
      )}
      <div style={{ height: 35 }} />
      {atLeastOneSocialLink !== undefined &&
        atLeastOneSocialLink !== null &&
        atLeastOneSocialLink?.length > 0 && (
          <Social facebook={info?.Facebook} instagram={info?.Instagram} />
        )}
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
