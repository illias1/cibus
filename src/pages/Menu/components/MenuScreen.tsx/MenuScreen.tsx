import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// components
import MenuItem from "./components/MenuItem";
import CategoriesSlider from "./components/CategoriesSlider";
import ItemPopup from "./components/ItemPopup";
import background from "../../../../assets/background.png";
import MenuFallback from "../MenuFallback";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory, useParams } from "react-router-dom";
import { TParams, TItems } from "../../../../types";
import Badge from "@material-ui/core/Badge";
import { useTypedSelector } from "../../../../store/types";
import { useQuery } from "../../../../utils/useQuery";
import { GetPropertyQuery, GetPropertyQueryVariables } from "../../../../API";
import { getProperty } from "../../graphql";
import { useDispatch } from "react-redux";
import { setupMenu } from "../../../../store/actions";
import { useTranslation } from "react-i18next";
import { validateOpeningAndTable } from "../../../../utils/validateOpeningAndTable";
type IMenuScreenProps = {};

const MenuScreen: React.FC<IMenuScreenProps> = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cartItemsLength = useTypedSelector(
    (state) => state.cart.filter((item) => item.status === "ADDED_TO_CART").length
  );
  const { itemsByCategory, categories } = useTypedSelector((state) => state.menu);
  const { restaurantNameUrl, tableName } = useParams<TParams>();
  const { loading, data } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(getProperty, {
    name: restaurantNameUrl,
  });
  React.useEffect(() => {
    if (data && data.getProperty && data.getProperty.menu && data.getProperty.menu.items) {
      // ts doesnt't give error in vscode but throws at runtime
      // @ts-ignore
      dispatch(setupMenu(data.getProperty.menu.items));
      validateOpeningAndTable(tableName, data, dispatch, t);
    }
  }, [data]);

  const [popupOpen, setpopupOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setpopupOpen(false);
  };
  const [items, setitems] = React.useState<TItems>({
    title: "",
    ingredients: [""],
    price: 0,
    allergy: [],
    img: "",
    notes: [],
    cal: "",
  });
  return (
    <>
      <ItemPopup
        open={popupOpen}
        handleClose={handleClose}
        items={{
          allergy: items.allergy,
          price: items!.price,
          title: items.title,
          ingredients: items?.ingredients,
          img: items.img,
          cal: items.cal,
          notes: items.notes,
        }}
      />

      <Badge className={classes.cartFAB} badgeContent={cartItemsLength} color="primary">
        <Fab
          onClick={() => history.push(`/${restaurantNameUrl}/${tableName}/cart`)}
          color="secondary"
          aria-label="add"
        >
          <ShoppingBasketIcon />
        </Fab>
      </Badge>
      {loading ? (
        <MenuFallback />
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundPositionY: "bottom",
              backgroundSize: "cover",
            }}
            className={classes.image}
          >
            <Typography variant="h5" className={classes.restName}>
              Eleven Madison Park
            </Typography>
            <Typography variant="h6" className={classes.restAddress}>
              11 Madison Ave, New York, NY 10010,
            </Typography>
          </div>
          <CategoriesSlider categories={categories} />
          <Box className={classes.root}>
            {itemsByCategory.map(({ items, category }, i) => (
              <React.Fragment key={category}>
                <Typography id={`category-${category}`} className={classes.title} variant="h4">
                  {category}
                </Typography>
                {/* { title, price, ingredients, allergy, img, cal, notes } */}
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    {item ? (
                      <MenuItem
                        onClick={(e) => {
                          setpopupOpen(true);
                          setitems({
                            title: item!.i18n[0].name,
                            price: item!.price,
                            ingredients: ((item!.i18n[0].description as unknown) as string[]) || [
                              "",
                            ],
                            allergy: (item.allergyInfo as unknown) as string[],
                            img: item.image || "",
                            cal: item.callories || "",
                            notes: [""],
                          });
                        }}
                        title={item!.i18n[0].name}
                        ingredients={item!.i18n[0].description || ""}
                        price={item!.price}
                        img={item.image || ""}
                      />
                    ) : null}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      width: "100%",
      height: "599px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    root: {
      padding: "18px 23px",
    },
    title: {
      font: "SemiBold 17px/20px Josefin Sans",
      letterSpacing: 0,
    },

    cartFAB: {
      position: "fixed",
      bottom: "9px",
      right: "12px",
    },
    restName: {
      color: theme.palette.common.white,
    },
    restAddress: {
      color: theme.palette.text.hint,
      marginBottom: theme.spacing(4),
    },
  })
);

export default MenuScreen;
