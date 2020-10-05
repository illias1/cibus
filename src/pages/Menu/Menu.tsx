import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// components
import MenuItem from "./components/MenuItem";
import CategoriesSlider from "./components/CategoriesSlider";
import ItemPopup from "./components/ItemPopup";
import Footer from "../../components/Footer";
import CartFab from "./components/CartFab";
import BigList from "./components/BigList";
import LanguageSwitch from "../../components/LanguageSwitch";
// else
import MenuFallback from "./components/MenuFallback";
import { useParams } from "react-router-dom";
import { TParams, TMenuItemTranslated } from "../../types";
import { useTypedSelector } from "../../store/types";
import { useQuery } from "../../utils/useQuery";
import { GetPropertyQuery, GetPropertyQueryVariables, Language, MenuItemStatus } from "../../API";
import { getProperty } from "./graphql";
import { useDispatch } from "react-redux";
import { setupMenu, setFeedback, setProperty } from "../../store/actions";
import { useTranslation } from "react-i18next";
import { validateOpeningAndTable } from "../../utils/validateOpeningAndTable";
import CallStuffFab from "../../components/CallStuffFab";
import { NO_TRANSLATE } from "../../utils/_constants";
import { findS3Image } from "../../utils/findS3Image";

type IMenuScreenProps = {};

export type TMenuItemTranslatedWithS3Image = TMenuItemTranslated & { s3Url?: string };
const initialMenuItemTranslated: TMenuItemTranslated = {
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
  addComponents: [],
  status: MenuItemStatus["AVAILABLE"],
  favorite: false,
  callories: "",
  image: "",
  notes: "",
  createdAt: "",
  updatedAt: "",
  owner: "",
};

const MenuScreen: React.FC<IMenuScreenProps> = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    property: { address, NonUniqueName, image },
    initialized,
  } = useTypedSelector((state) => state);
  const { itemsByCategory, categories, favorites } = useTypedSelector((state) => state.menu);
  const { restaurantNameUrl, tableName } = useParams<TParams>();
  const { loading, data } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(
    getProperty,
    {
      name: restaurantNameUrl,
    },
    !initialized
  );
  React.useEffect(() => {
    console.log("data", data);
    if (data && data.getProperty && data.getProperty.menu) {
      findS3Image(data.getProperty.image?.main || "", sets3Url);
      dispatch(
        setupMenu({
          payload: data.getProperty["menu"],
          menuComp: data.getProperty.menuComponents,
          currentLang: i18n.language as Language,
        })
      );
      dispatch(setProperty(data.getProperty));
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
  const [item, setitem] = React.useState<TMenuItemTranslatedWithS3Image>(initialMenuItemTranslated);
  const [s3Url, sets3Url] = React.useState<string>("");

  return (
    <>
      <ItemPopup open={popupOpen} handleClose={handleClose} item={item} />

      <CartFab restaurantNameUrl={restaurantNameUrl} tableName={tableName} />
      <CallStuffFab restaurantNameUrl={restaurantNameUrl} tableName={tableName} />
      <LanguageSwitch />
      {loading ? (
        <MenuFallback />
      ) : (
        <>
          {s3Url.length > 0 && (
            <div
              style={{
                backgroundImage: `url(${s3Url})`,
                backgroundPositionY: "bottom",
                backgroundPositionX: "center",
                backgroundSize: "cover",
              }}
              className={classes.image}
            >
              <Typography variant="h5" className={classes.restName + NO_TRANSLATE}>
                {NonUniqueName}
              </Typography>
              <Typography variant="h6" className={classes.restAddress}>
                {address?.city}, {address?.exact}
              </Typography>
            </div>
          )}
          <CategoriesSlider categories={categories} />
          <Box className={classes.root}>
            {favorites.length > 0 && (
              <Typography
                gutterBottom={true}
                id={`category-${favorites}`}
                className={classes.title}
                variant="h4"
              >
                {t("menu_chef_favorites")}
              </Typography>
            )}
            <Box className={classes.horizontalParent}>
              {favorites.map((fav) => (
                <div key={fav.id} className={classes.horizontalChild}>
                  <MenuItem item={fav} setitem={setitem} setpopupOpen={setpopupOpen} />
                </div>
              ))}
            </Box>
            <BigList
              itemsByCategory={itemsByCategory}
              setitem={setitem}
              setpopupOpen={setpopupOpen}
            />
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
      height: "50vh",
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
