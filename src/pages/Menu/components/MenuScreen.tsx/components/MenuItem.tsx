import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "../../../../../utils/customCreateTheme";

type TItem = {
  title: string;
  price: number;
  ingredients?: string;
  img: string;
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
};

const Item: React.FC<TItem> = ({ title, price, ingredients, onClick, img }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card className={classes.root} onClick={onClick}>
      <Box className={classes.content}>
        <Box className={classes.tileAndPrice}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          <Typography variant="body1">{t("price_euro", { price })}</Typography>
        </Box>
        <Typography className={classes.ingredients} variant="body1" color="textSecondary">
          {ingredients}
        </Typography>
      </Box>
      <img className={classes.cover} src={img} alt={title} />
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
  })
);

export default Item;
