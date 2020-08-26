import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetMenuItemQuery } from "../API";
import { TItems } from "../types";

export type TStore = {
  userName: string;
  userAlreadyVisited: boolean;
  cart: TCartItem[];
  groupCart: TGroupCartItem[];
  groupCartOrderPlaced: boolean;
  feedback: {
    open: boolean;
    message: string;
  };
  menu: TMenu;
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
export type TCartItemStatus = "added" | "placed";

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
