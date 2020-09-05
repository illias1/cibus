import { TStore, TCartItem, TGroupCartItem } from "./types";
import {
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_ALREADY_VISITED,
  LOCAL_STORAGE_CART,
  LOCAL_STORAGE_ORDERS,
} from "../utils/_constants";
import { Currency } from "../API";

const sampleGroupCart: TGroupCartItem[] = [
  {
    customerName: "Penny",
    price: 44.95,
    tip: 4.5,
  },
  {
    customerName: "Raj",
    price: 17.98,
    tip: 4.5,
  },
  {
    customerName: "Leonard",
    price: 0,
    tip: 0,
  },
];

export const initialState: TStore = {
  userName: localStorage.getItem(LOCAL_STORAGE_USER_NAME) || "",
  userAlreadyVisited: localStorage.getItem(LOCAL_STORAGE_USER_ALREADY_VISITED) ? true : false,
  cart: (JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART) || "[]") as TCartItem[]) || [],
  orders:
    (JSON.parse(localStorage.getItem(LOCAL_STORAGE_ORDERS) || "[]") as TStore["orders"]) || [],
  groupCart: sampleGroupCart,
  groupCartOrderPlaced: false,
  feedback: {
    open: false,
    message: "",
    duration: 1500,
  },
  menu: {
    categories: [],
    itemsByCategory: [],
  },
  valid: false,
  currency: Currency["USD"],
};
