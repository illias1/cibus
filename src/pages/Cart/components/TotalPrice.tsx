import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";

type ITotalPriceProps = {
  price: number;
  tip?: number;
  subtotal?: boolean;
};

const TotalPrice: React.FC<ITotalPriceProps> = ({ price, tip = 0, subtotal }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.root}>
      <Typography variant="h5">{subtotal ? t("cart_subtotal") : t("cart_total")}</Typography>
      <Box className={classes.priceArea}>
        {Boolean(tip) && (
          <>
            <Typography color="textSecondary" align="right" className={classes.tipInfo}>
              {t("cart_subtotal")} {t("price_euro", { price: price - tip })}
            </Typography>
            <Typography color="textSecondary" align="right" className={classes.tipInfo}>
              {t("cart_tip")} {t("price_euro", { price: tip })}
            </Typography>
          </>
        )}
        <Typography align="right" variant="h5">
          {t("price_euro", { price })}
        </Typography>
        {!subtotal && (
          <Typography
            align="right"
            className={classes.fontFamily}
            color="textSecondary"
            variant="body1"
          >
            {t("cart_vat_included")} - {t("cart_tip_not_included")}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: theme.spacing(1),
      boxShadow: "0px 3px 6px #00000029",
      height: 91,
      padding: "0 45px",
    },
    priceArea: {},
    tipInfo: {
      fontSize: 9,
      fontFamily: theme.typography.fontFamily,
    },
    fontFamily: {
      fontFamily: theme.typography.fontFamily,
    },
  })
);

export default TotalPrice;
