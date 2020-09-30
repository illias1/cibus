import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Language, MenuItemStatus } from "../../../API";
import { useTypedSelector } from "../../../store/types";
import { CustomTheme } from "../../../utils/customCreateTheme";
import { findS3Image } from "../../../utils/findS3Image";
import { TMenuItemTranslated } from "../../../types";
import { TMenuItemTranslatedWithS3Image } from "../Menu";
import { priceDisplay } from "../../../utils/priceDisplay";
import { analyticsDetailView } from "../utils";

type TItem = {
  item: TMenuItemTranslated;
  setpopupOpen: (value: React.SetStateAction<boolean>) => void;
  setitem: (value: React.SetStateAction<TMenuItemTranslatedWithS3Image>) => void;
};

const Item: React.FC<TItem> = ({ item, setitem, setpopupOpen }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { currency } = useTypedSelector((state) => state.property);
  React.useEffect(() => {
    findS3Image(item.image, sets3Url);
  }, []);
  const [s3Url, sets3Url] = React.useState<string>("");
  return (
    <Card
      style={{ backgroundColor: item.status === MenuItemStatus.AVAILABLE ? "" : "lightgray" }}
      className={classes.root}
      onClick={() => {
        setpopupOpen(true);
        setitem({
          ...item,
          s3Url,
        });
        analyticsDetailView(item);
      }}
    >
      <Box className={classes.content}>
        <Box className={classes.tileAndPrice}>
          <Typography className={classes.title} variant="h6">
            {item.i18n.name}
          </Typography>
          <Typography className={classes.price} variant="subtitle1">
            {priceDisplay(currency, item.price, i18n.language as Language)}
          </Typography>
        </Box>
        <Typography className={classes.ingredients} variant="body1" color="textSecondary">
          {item.i18n.description}
        </Typography>
      </Box>
      {item.image?.includes("http") ? (
        <img
          id={item.id}
          className={classes.cover}
          src={item.image || ""}
          alt={item.i18n.name}
          onError={() => {
            document.getElementById(item.id)!.style.display = "none";
          }}
        />
      ) : s3Url ? (
        <img
          id={item.id}
          className={classes.cover}
          src={s3Url}
          alt={item.i18n.name}
          onError={() => {
            document.getElementById(item.id)!.style.display = "none";
          }}
        />
      ) : (
        ""
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: 10,
      height: 100,
      flexDirection: "row",
      boxShadow: "0px 3px 50px #00000029",
      margin: "0 0 10px 0",
      alignItems: "center",
    },
    content: {
      padding: 23,
      flexGrow: 1,
    },
    cover: {
      minWidth: 107,
      maxWidth: 107,
      height: 100,
    },

    tileAndPrice: {
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
      fontFamily: theme.typography.secondaryFontFamily,
    },
    price: {
      minWidth: "fit-content",
    },
  })
);

export default Item;
