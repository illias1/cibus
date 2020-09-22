import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { TMenuItemTranslated } from "../../../types";
import Typography from "@material-ui/core/Typography";
import MenuItem from "./MenuItem";
import { MenuItemStatus } from "../../../API";

type IBigListProps = {
  itemsByCategory: Record<string, Record<string, TMenuItemTranslated>>;
  handleMenuitemClick: (
    item: TMenuItemTranslated
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const BigList: React.FC<IBigListProps> = ({ itemsByCategory, handleMenuitemClick }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <React.Fragment key={category}>
          <Typography
            gutterBottom={true}
            id={`category-${category}`}
            className={classes.title}
            variant="h4"
          >
            {category}
          </Typography>
          {Object.entries(items).map(([id, item]) => (
            <React.Fragment key={id}>
              {item ? (
                <MenuItem
                  available={item.status === MenuItemStatus.AVAILABLE}
                  onClick={handleMenuitemClick(item)}
                  title={item.i18n.name}
                  ingredients={item.i18n.description || ""}
                  price={item.price}
                  img={item.image || ""}
                  id={item.id}
                />
              ) : null}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      font: "normal normal bold 43px/40px Josefin Sans",
      letterSpacing: 0,
    },
  })
);

export default BigList;
