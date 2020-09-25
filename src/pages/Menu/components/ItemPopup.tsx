import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart, updateItemAddedToCart } from "../../../store/actions";
import { useTypedSelector } from "../../../store/types";
import { ReactComponent as Placeholder } from "../../../assets/placeholder.svg";
import { priceDisplay } from "../../../utils/priceDisplay";
import { Language, MenuCompType, MenuItemStatus } from "../../../API";
import { TMenuComponentTranslated } from "../../../types";
import MenuComponentRadio from "../../../components/MenuComponentRadio";
import MenuComponentCheckBox from "../../../components/MenuComponentCheckbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { getRadioDefaultValue, prepareItemToAddToCart } from "../utils";
import IconButton from "@material-ui/core/IconButton";
import { findS3Image } from "../../../utils/findS3Image";
import { TMenuItemTranslatedWithS3Image } from "../Menu";
type IItemPopupProps = {
  item: TMenuItemTranslatedWithS3Image;
  handleClose: () => void;
  open: boolean;
};
// string - component id
// value - choice index if radio, array of options with associated boolean value if checkbox
export type TComponentChoice = Record<string, number | boolean[]>;

const ItemPopup: React.FC<IItemPopupProps> = ({ item, handleClose, open }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    cart,
    menu: { menuComponents },
    property: { currency },
  } = useTypedSelector((state) => state);
  const { t, i18n } = useTranslation();
  const [quantity, setquantity] = React.useState<number>(1);
  const [customerComment, setcustomerComment] = React.useState<string>("");
  const thisItemInCart = cart.find((cartitem) => cartitem.id === item!.id);
  const foundComps = React.useMemo(
    () =>
      menuComponents.reduce(
        (prev, curr) => (item.addComponents?.includes(curr.id) ? prev.concat([curr]) : prev),
        [] as TMenuComponentTranslated[]
      ),
    [item]
  );
  const { register, handleSubmit, errors, control, getValues, trigger } = useForm<TComponentChoice>(
    {}
  );
  const handleClick: SubmitHandler<TComponentChoice> = (data) => {
    console.log("data from form", data);
    const preparedItem = prepareItemToAddToCart(foundComps, data, item, quantity, customerComment);
    if (thisItemInCart) {
      dispatch(updateItemAddedToCart(preparedItem));
    } else {
      dispatch(addToCart(preparedItem));
    }
    handleClose();
  };
  // ============================================================================================================================================
  // EFFECTS
  React.useEffect(() => {
    if (thisItemInCart) {
      console.log("this item is already in the cart");
      setquantity(thisItemInCart.quantity);
      if (thisItemInCart.customerComment) {
        setcustomerComment(thisItemInCart.customerComment);
      }
      // TODO : SET ALREADY CHOSEN VALUES
    }
  }, [open]);

  React.useEffect(() => {
    return () => {
      setquantity(1);
      setcustomerComment("");
    };
  }, [item]);
  // ============================================================================================================================================
  // UI
  const body = (
    <Container className={classes.root}>
      {item.image ? (
        <div
          style={{
            background: `linear-gradient( rgba(256, 256, 256, 0), rgba(256, 256, 256, 1)), url(${item.s3Url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={classes.image}
        />
      ) : (
        <Placeholder style={{ width: "100%", height: 200 }} />
      )}
      <IconButton onClick={handleClose} color="secondary" className={classes.closeIcon}>
        <CancelIcon />
      </IconButton>
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
        <form onSubmit={handleSubmit(handleClick)}>
          {foundComps.map(({ id, translations, restrictions, type }, index) => (
            <React.Fragment key={id}>
              {foundComps ? (
                type === MenuCompType.RADIO ? (
                  <MenuComponentRadio
                    defaultValue={getRadioDefaultValue(translations, thisItemInCart, index)}
                    type={type}
                    id={id}
                    restrictions={restrictions}
                    translations={translations}
                    currency={currency}
                    control={control}
                  />
                ) : (
                  <MenuComponentCheckBox
                    trigger={trigger}
                    errors={errors}
                    getValues={getValues}
                    type={type}
                    id={id}
                    restrictions={restrictions}
                    translations={translations}
                    currency={currency}
                    register={register}
                    defaultValues={translations.optionChoice.map((option) =>
                      thisItemInCart?.options[index].optionChoice.find(
                        (chosenBefore) => chosenBefore.name === option.name
                      )
                        ? true
                        : false
                    )}
                  />
                )
              ) : null}
            </React.Fragment>
          ))}
          <Box className={classes.priceZone}>
            <Box style={{ fontSize: 23, minWidth: "fit-content" }}>
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
          {thisItemInCart && (
            <Typography variant="subtitle2" color="secondary" align="center">
              {t("item_popup_already_added")}
            </Typography>
          )}
          <StyledButton
            disabled={item.status === MenuItemStatus.OUT_OF_STOCK}
            className={classes.cartBtn}
            // onCLick={handleClick}
            type="submit"
          >
            {thisItemInCart ? t("item_popup_button_revisited") : t("item_popup_add_to_cart")}
          </StyledButton>
        </form>
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
      width: "21px",
      height: "26px",
      border: "2px solid #929EA5",
      borderRadius: 1,
      margin: "0 10px",
      fontSize: "large",
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
    closeIcon: {
      position: "absolute",
      top: "3%",
      right: "3%",
    },
  })
);

export default React.memo(ItemPopup);
