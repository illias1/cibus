import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetOrderQuery } from "../API";
import { GetPropertyQueryForCart } from "../pages/Cart/graphql";
import {
  OrderStatus,
  TMenuComponentTranslated,
  TMenuItemTranslated,
  TNonNullMenuItem,
  TNonNullPropertyQuery,
} from "../types";

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
  property: GetPropertyQueryForCart["getProperty"];
  initialized: boolean;
};

type TMenu = {
  categories: string[];
  itemsByCategory: TcategorizedMenuItems;
  favorites: TMenuItemTranslated[];
  originalMenuItemList: TNonNullMenuItem[];
  menuComponents: TMenuComponentTranslated[];
  originalMenuComp: TNonNullPropertyQuery["menuComponents"];
};
export type TcategorizedMenuItems = Record<string, Record<string, TMenuItemTranslated>>;

export type TCartItem = TMenuItemTranslated & {
  quantity: number;
  customerComment?: string;
  options: TComponentChosenOptions[];
  optionsTotalPrice: number;
};
type TComponentChosenOptions = {
  id: string;
  label: string;
  optionChoice: TMenuComponentTranslated["translations"]["optionChoice"];
};
export type TCartItemStatus = "ADDED_TO_CART" | OrderStatus;

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
