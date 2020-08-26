/*
===================
depreceteated - only using the individual screen
===================
*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
// componetns
// import GroupTab from "./components/GroupTab";
import IndividualTab from "./components/IndividualTab";
import CartHeader from "./components/CartHeader";
import TabPanel from "./components/TabPanel";
import { CustomTabs, CustomTab } from "./components/CustomTabs";

function a11yProps(index: number) {
  return {
    id: `cart-tab-${index}`,
    "aria-controls": `cart-tabpanel-${index}`,
  };
}

type ICartProps = {};

const Cart: React.FC<ICartProps> = ({ ...props }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };
  return (
    <>
      <CartHeader />
      <div className={classes.root}>
        <CustomTabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.tabLabel}
        >
          <CustomTab label={t("cart_individual_order_tab_label")} {...a11yProps(0)} />
          {/* <CustomTab label={t("cart_table_order_tab_label")} {...a11yProps(1)} /> */}
        </CustomTabs>
        <TabPanel value={value} index={0}>
          <IndividualTab />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
        <GroupTab />
      </TabPanel> */}
      </div>
    </>
  );
};

export default Cart;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  tabLabel: {
    textTransform: "none",
  },
}));
