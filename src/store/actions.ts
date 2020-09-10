import actionCreatorFactory from "typescript-fsa";
import { TCartItem, TStore } from "./types";
import { Currency, Language } from "../API";
import { OrderStatus, TNonNullPropertyQuery } from "../types";

const actionCreator = actionCreatorFactory();

export const addToCart = actionCreator<TCartItem>("addToCart");
export const removeItemFromCart = actionCreator<string>("removeItemFromCart");
export const addToOrders = actionCreator<TStore["orders"][0]>("addToOrders");
export const updateOrdersItemStatus = actionCreator<{
  id: string;
  status: OrderStatus;
}>("updateOrdersItemStatus");
export const setFeedback = actionCreator<TStore["feedback"]>("setFeedback");
export const updateItemAddedToCart = actionCreator<TCartItem>("updateItemAddedToCart");

export const setupMenu = actionCreator<{
  payload: TNonNullPropertyQuery["menu"];
  currentLang: Language;
}>("setupMenu");
export const setValid = actionCreator<boolean>("setValid");
export const setCurrency = actionCreator<Currency>("setCurrency");
