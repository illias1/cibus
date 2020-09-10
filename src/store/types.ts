import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetOrderQuery, Currency } from "../API";
import { OrderStatus, TMenuItemTranslated, TNonNullMenuItem } from "../types";

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
  itemsByCategory: TcategorizedMenuItems;
  favorites: TMenuItemTranslated[];
  originalMenuItemList: TNonNullMenuItem[];
};
export type TcategorizedMenuItems = Record<string, Record<string, TMenuItemTranslated>>;

export type TCartItem = TMenuItemTranslated & {
  quantity: number;
  customerComment?: string;
};
export type TCartItemStatus = "ADDED_TO_CART" | OrderStatus;

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
