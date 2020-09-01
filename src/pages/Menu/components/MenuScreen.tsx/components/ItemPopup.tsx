import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../../../../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart, setFeedback } from "../../../../../store/actions";
import { useTypedSelector } from "../../../../../store/types";
import image from "../../../../../assets/popup.png";
import { TItems } from "../../../../../types";

type IItemPopupProps = {
  items: TItems;
  handleClose: () => void;
  open: boolean;
};

const ItemPopup: React.FC<IItemPopupProps> = ({
  items: { title, price, ingredients, allergy, notes, cal, img },
  handleClose,
  open,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartItems = useTypedSelector((state) => state.cart);
  const { t } = useTranslation();
  const [quantity, setquantity] = React.useState<number>(1);
  const body = (
    <Container className={classes.root}>
      <div
        style={{
          background: `linear-gradient( rgba(256, 256, 256, 0), rgba(256, 256, 256, 1)), url(${image})`,
        }}
        className={classes.image}
      />
      <Container>
        <Typography variant="h4">{title}</Typography>
        <Typography color="textSecondary" variant="body2">
          {ingredients}
        </Typography>
        <Typography className={classes.paragraph} variant="body1">
          {t("menu_allergy_info_label")}
        </Typography>

        <Typography color="textSecondary" variant="body2">
          {allergy}
        </Typography>
        <Typography className={classes.paragraph} variant="body1">
          {t("menu_special_instructions_label")}
        </Typography>
        <TextField
          id="standard-textarea"
          placeholder={t("item_popup_note_placeholder")}
          multiline
          fullWidth
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
          <Typography variant="h5">{t("price_euro", { price: price * quantity })}</Typography>
        </Box>
        <StyledButton
          className={classes.cartBtn}
          disabled={
            cartItems
              .filter((item) => item.status === "added")
              .findIndex((item) => item.item.title === title) < 0
              ? false
              : true
          }
          onCLick={() => {
            dispatch(
              addToCart({
                status: "added",
                item: { title, price, ingredients, allergy, img: "", notes, cal },
                quantity,
                img,
              })
            );
            handleClose();
            dispatch(
              setFeedback({
                open: true,
                message: t("feedback_item_added_to_cart"),
                duration: 1500,
              })
            );
          }}
        >
          {t("item_popup_add_to_cart")}
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
      height: 265,
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
