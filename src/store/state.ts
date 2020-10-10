import { TStore, TCartItem } from "./types";
import { LOCAL_STORAGE_CART, LOCAL_STORAGE_ORDERS } from "../utils/_constants";
import { Currency } from "../API";

export const initialState: TStore = {
  cart: (JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART) || "[]") as TCartItem[]) || [],
  orders:
    (JSON.parse(localStorage.getItem(LOCAL_STORAGE_ORDERS) || "[]") as TStore["orders"]) || [],
  feedback: {
    open: false,
    message: "",
    duration: 1500,
  },
  menu: {
    categories: [],
    itemsByCategory: {},
    favorites: [],
    originalMenuItemList: [],
    menuComponents: [],
    originalMenuComp: [],
  },
  valid: false,
  property: {
    info: null,
    name: "",
    image: {
      main: "",
    },
    NonUniqueName: "",
    tables: [],
    open: false,
    currency: Currency["USD"],
    address: {
      country: "",
      city: "",
      exact: "",
    },
  },
  initialized: false,
};
