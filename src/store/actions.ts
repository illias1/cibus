import actionCreatorFactory from "typescript-fsa";
import { TCartItem, TCartItemStatus } from "./types";
import { GetMenuItemQuery } from "../API";

const actionCreator = actionCreatorFactory();

export const setUserName = actionCreator<string>("setUserName");
export const setUserAlreadyVisited = actionCreator<boolean>("setUserAlreadyVisited");
export const addToCart = actionCreator<TCartItem>("addToCart");
export const removeItemFromCart = actionCreator<string>("removeItemFromCart");
export const setCartItemsStatus = actionCreator<TCartItemStatus>("setCartItemsStatus");
export const setGroupOrderPlaced = actionCreator<boolean>("setGroupOrderPlaced");

export const setFeedback = actionCreator<{
  open: boolean;
  message: string;
}>("setFeedback");

export const setupMenu = actionCreator<GetMenuItemQuery["getMenuItem"][]>("setupMenu");
