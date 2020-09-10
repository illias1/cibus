import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// components
import MenuItem from "./components/MenuItem";
import CategoriesSlider from "./components/CategoriesSlider";
import ItemPopup from "./components/ItemPopup";
import background from "../../assets/background.png";
import MenuFallback from "./components/MenuFallback";
import LanguageSwitch from "../../components/LanguageSwitch";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory, useParams } from "react-router-dom";
import { TParams, TMenuItemTranslated } from "../../types";
import Badge from "@material-ui/core/Badge";
import { useTypedSelector } from "../../store/types";
import { useQuery } from "../../utils/useQuery";
import { GetPropertyQuery, GetPropertyQueryVariables, Language, MenuItemStatus } from "../../API";
import { getProperty } from "./graphql";
import { useDispatch } from "react-redux";
import { setupMenu, setFeedback } from "../../store/actions";
import { useTranslation } from "react-i18next";
import { validateOpeningAndTable } from "../../utils/validateOpeningAndTable";
import Footer from "../../components/Footer";
type IMenuScreenProps = {};

const initialMenuItemTranslated = {
  __typename: "MenuItem" as const,
  id: "",
  propertyName: "",
  i18n: {
    __typename: "I18nMenuItem" as const,
    language: Language["en"],
    name: "",
    category: "",
    description: "",
  },
  price: 0,
  status: MenuItemStatus["AVAILABLE"],
  favorite: false,
  allergyInfo: "",
  callories: "",
  image: "",
  notes: "",
  createdAt: "",
  updatedAt: "",
  owner: "",
};

const MenuScreen: React.FC<IMenuScreenProps> = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const cartItemsLength = useTypedSelector((state) => state.cart.length);
  const { itemsByCategory, categories, favorites } = useTypedSelector((state) => state.menu);
  const { restaurantNameUrl, tableName } = useParams<TParams>();
  const { loading, data } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(getProperty, {
    name: restaurantNameUrl,
  });
  React.useEffect(() => {
    console.log("data", data);
    if (data && data.getProperty && data.getProperty.menu) {
      dispatch(
        setupMenu({
          payload: data.getProperty.menu,
          currentLang: i18n.language as Language,
        })
      );
      validateOpeningAndTable(tableName, data, dispatch, t);
    }
    if (data.getProperty === null) {
      dispatch(
        setFeedback({
          open: true,
          message: "Property doesn't exist",
        })
      );
    }
  }, [data]);

  const [popupOpen, setpopupOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setpopupOpen(false);
  };
  const [item, setitem] = React.useState<TMenuItemTranslated>(initialMenuItemTranslated);
  return (
    <>
      <ItemPopup open={popupOpen} handleClose={handleClose} item={item} />

      <Badge className={classes.cartFAB} badgeContent={cartItemsLength} color="primary">
        <Fab
          onClick={() => history.push(`/${restaurantNameUrl}/${tableName}/cart`)}
          color="secondary"
          aria-label="add"
        >
          <ShoppingBasketIcon />
        </Fab>
      </Badge>
      <LanguageSwitch />
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
            <Typography
              gutterBottom={true}
              id={`category-${favorites}`}
              className={classes.title}
              variant="h4"
            >
              {t("menu_chef_favorites")}
            </Typography>
            <Box className={classes.horizontalParent}>
              {favorites.map((fav) => (
                <div className={classes.horizontalChild}>
                  <MenuItem
                    onClick={(e) => {
                      setpopupOpen(true);
                      setitem(fav);
                    }}
                    title={fav.i18n.name}
                    ingredients={fav.i18n.description || ""}
                    price={fav.price}
                    img={fav.image || ""}
                    id={fav.id}
                  />
                </div>
              ))}
            </Box>
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
                {/* { title, price, ingredients, allergy, img, cal, notes } */}
                {Object.entries(items).map(([id, item]) => (
                  <React.Fragment key={id}>
                    {item ? (
                      <MenuItem
                        onClick={(e) => {
                          setpopupOpen(true);
                          setitem(item);
                        }}
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
          </Box>
        </>
      )}
      <Footer />
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
      font: "normal normal bold 43px/40px Josefin Sans",
      letterSpacing: 0,
    },

    cartFAB: {
      position: "fixed",
      bottom: "9px",
      right: "12px",
      zIndex: 2,
    },
    restName: {
      color: theme.palette.common.white,
    },
    restAddress: {
      color: theme.palette.text.hint,
      marginBottom: theme.spacing(4),
    },
    horizontalChild: {
      flex: "0 0 auto",
      width: "83%",
      marginRight: "14px",
      overflow: "inherit",
      borderRadius: "20px",
    },
    horizontalParent: {
      display: "flex",
      overflowX: "auto",
      marginRight: "-23px",
      marginBottom: theme.spacing(2),
    },
  })
);

export default MenuScreen;
