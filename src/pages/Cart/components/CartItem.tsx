import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../store/actions";
import { TCartItemStatus } from "../../../store/types";
import { IMAGE_OVERLAY_COLOR } from "../../../utils/_constants";
type TItem = {
  title: string;
  price: string;
  ingredients: string | null;
  img: string | null;
  quantity: number;
  status: TCartItemStatus;
  id?: string;
};

const displayStatusOnImage = (status: TCartItemStatus): string => {
  switch (status) {
    case "ADDED_TO_CART":
      return "cart_item_status_not_placed_yet";
    case "DENIED":
      return "cart_item_status_denied";
    case "READY":
      return "cart_item_status_ready";
    case "RECEIVED_BY_RESTAURANT":
      return "cart_item_status_received_by_restaurant";
    case "REQUESTED_BY_CUSTOMER":
      return "cart_item_status_requested_by_customer";
    default:
      return "";
  }
};

const Item: React.FC<TItem> = ({ title, price, ingredients, quantity, img, status, id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.horizontal}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          <Box className={classes.priceQuantity}>
            <Typography variant="body1">{price}</Typography>
            <Typography align="right" variant="body1">
              {quantity > 1 && `x${quantity}`}
            </Typography>
          </Box>
        </Box>
        {ingredients && (
          <Typography className={classes.ingredients} variant="body1" color="textSecondary">
            {ingredients}
          </Typography>
        )}
        {status === "ADDED_TO_CART" && (
          <Box className={classes.horizontal}>
            <Button className={classes.button} endIcon={<ExpandMoreIcon />}>
              {t("cart_item_customize_option")}
            </Button>

            <IconButton
              onClick={() => dispatch(removeItemFromCart(id!))}
              className={classes.iconButton}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <div
        className={classes.cover}
        style={{
          backgroundImage: `linear-gradient(${IMAGE_OVERLAY_COLOR}, ${IMAGE_OVERLAY_COLOR}), url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <Typography align="center" variant="body1">
          {t(displayStatusOnImage(status))}
        </Typography>
        {status === "ADDED_TO_CART" ? (
          <WarningIcon color="secondary" />
        ) : (
          <CheckCircleIcon style={{ color: "lightgreen", marginTop: 5 }} />
        )}
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: 10,
      height: 100,
      flexDirection: "row",
      boxShadow: "0px 3px 50px #00000029",
      margin: "0 0 10px 0",
    },
    content: {
      padding: "10px 10px 10px 23px",
      flexGrow: 1,
    },
    cover: {
      minWidth: 107,
      maxWidth: 107,
      height: 100,
      position: "relative",
      color: theme.palette.getContrastText(IMAGE_OVERLAY_COLOR),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },

    horizontal: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      textOverflow: "ellipsis",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 1,
      display: "-webkit-box",
      overflow: "hidden",
    },
    ingredients: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2 /* numb,r of lines to show */,
      "-webkit-box-orient": "vertical",
      maxWidth: "90%",
    },
    button: {
      textTransform: "none",
      fontSize: theme.typography.body1.fontSize,
      padding: 0,
      fontFamily: theme.typography.fontFamily,
    },
    iconButton: {
      padding: 0,
    },
    priceQuantity: {
      minWidth: "fit-content",
    },
  })
);

export default Item;
