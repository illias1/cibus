import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetOrderQuery, Currency } from "../API";
import { OrderStatus, TMenuItemTranslated } from "../types";

export type TStore = {
  cart: TCartItem[];
  orders: GetOrderQuery["getOrder"][];
  feedback: {
    open: boolean;
    message: string;
    duration?: number | null;
  };
  menu: TMenu;
  valid: boolean;
  currency: Currency;
};

type TMenu = {
  categories: string[];
  itemsByCategory: { category: string; items: TMenuItemTranslated[] }[];
};

export type TCartItem = TMenuItemTranslated & {
  quantity: number;
};
export type TCartItemStatus = "ADDED_TO_CART" | OrderStatus;

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
