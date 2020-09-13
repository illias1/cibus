import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart, setFeedback, updateItemAddedToCart } from "../../../store/actions";
import { useTypedSelector } from "../../../store/types";
import { ReactComponent as Placeholder } from "../../../assets/placeholder.svg";
import { priceDisplay } from "../../../utils/priceDisplay";
import { Language, MenuItemStatus } from "../../../API";
import { TMenuItemTranslated } from "../../../types";
type IItemPopupProps = {
  item: TMenuItemTranslated;
  handleClose: () => void;
  open: boolean;
};

const ItemPopup: React.FC<IItemPopupProps> = ({ item, handleClose, open }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currency, cart } = useTypedSelector((state) => state);
  const { t, i18n } = useTranslation();
  const [quantity, setquantity] = React.useState<number>(1);
  const [customerComment, setcustomerComment] = React.useState<string>("");
  const thisItemInCart = cart.find((cartitem) => cartitem.id === item!.id);
  React.useEffect(() => {
    if (thisItemInCart) {
      console.log("this item is already in the cart");
      setquantity(thisItemInCart.quantity);
      if (thisItemInCart.customerComment) {
        setcustomerComment(thisItemInCart.customerComment);
      }
    }
  }, [thisItemInCart]);
  React.useEffect(() => {
    return () => {
      setquantity(1);
      setcustomerComment("");
    };
  }, [item]);
  const handleClick = () => {
    if (thisItemInCart) {
      dispatch(
        updateItemAddedToCart({
          ...item,
          quantity,
          customerComment,
        })
      );
    } else {
      dispatch(
        addToCart({
          ...item,
          quantity,
          customerComment,
        })
      );
    }
    handleClose();
    dispatch(
      setFeedback({
        open: true,
        message: thisItemInCart
          ? t("feedback_order_item_modified")
          : t("feedback_item_added_to_cart"),
        duration: 1500,
      })
    );
  };
  const body = (
    <Container className={classes.root}>
      {item.image ? (
        <div
          style={{
            background: `linear-gradient( rgba(256, 256, 256, 0), rgba(256, 256, 256, 1)), url(${item.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={classes.image}
        />
      ) : (
        <Placeholder style={{ width: "100%", height: 200 }} />
      )}
      <Container>
        <Typography variant="h5">{item.i18n.name}</Typography>
        <Typography color="textSecondary" variant="body2">
          {item.i18n.description}
        </Typography>
        <Typography className={classes.paragraph} variant="body1">
          {t("menu_special_instructions_label")}
        </Typography>
        <TextField
          id="standard-textarea"
          placeholder={t("item_popup_note_placeholder")}
          multiline
          fullWidth
          value={customerComment}
          onChange={(e) => setcustomerComment(e.target.value)}
        />

        <Box className={classes.priceZone}>
          <Box>
            <ButtonBase
              className={classes.mathBtn}
              onClick={() => {
                if (quantity > 1) {
                  setquantity(quantity - 1);
                }
              }}
            >
              -
            </ButtonBase>
            {quantity}
            <ButtonBase className={classes.mathBtn} onClick={() => setquantity(quantity + 1)}>
              +
            </ButtonBase>
          </Box>
          <Typography variant="h5">
            {priceDisplay(currency, item.price * quantity, i18n.language as Language)}
          </Typography>
        </Box>
        {item.status === MenuItemStatus.OUT_OF_STOCK && (
          <Typography align="center" color="error">
            {t("item_popup_currently_unavailable")}
          </Typography>
        )}
        <StyledButton
          disabled={item.status === MenuItemStatus.OUT_OF_STOCK}
          className={classes.cartBtn}
          onCLick={handleClick}
        >
          {thisItemInCart ? t("item_popup_button_revisited") : t("item_popup_add_to_cart")}
        </StyledButton>
      </Container>
    </Container>
  );
  return (
    <Modal
      className={classes.modal}
      onClose={handleClose}
      open={open}
      aria-labelledby="item-details-popup"
      aria-describedby="area-to-see-details-and-add-to-cart"
    >
      {body}
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      backgroundColor: theme.palette.background.paper,
      width: "80%",
      borderRadius: theme.spacing(3),
      height: "80%",
      overflowY: "scroll",
      "&:focus": {
        outline: "none",
      },
    },
    image: {
      width: "100%",
      height: 196,
    },
    priceZone: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      height: theme.spacing(10),
      alignItems: "center",
    },
    mathBtn: {
      minWidth: "18px",
      height: "18px",
      border: "2px solid #929EA5",
      borderRadius: 1,
      margin: "0 10px",
    },
    paragraph: {
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.grey[200],
      marginLeft: -theme.spacing(2),
      marginRight: -theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    cartBtn: {
      margin: "0 auto 1em",
      display: "block",
      width: "80%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default ItemPopup;
