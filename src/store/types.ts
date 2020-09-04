import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetMenuItemQuery, GetOrderQuery } from "../API";
import { TItems, OrderStatus } from "../types";

export type TStore = {
  userName: string;
  userAlreadyVisited: boolean;
  cart: TCartItem[];
  orders: GetOrderQuery["getOrder"][];
  groupCart: TGroupCartItem[];
  groupCartOrderPlaced: boolean;
  feedback: {
    open: boolean;
    message: string;
    duration?: number | null;
  };
  menu: TMenu;
  valid: boolean;
};

type TMenu = {
  categories: string[];
  itemsByCategory: { category: string; items: GetMenuItemQuery["getMenuItem"][] }[];
};

export type TCartItem = {
  item: TItems;
  status: TCartItemStatus;
  quantity: number;
  img: string;
};
export type TCartItemStatus = "ADDED_TO_CART" | OrderStatus;

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
