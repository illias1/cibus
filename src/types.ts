import { GetMenuItemQuery } from "./API";

export type TParams = {
  restaurantNameUrl: string;
  tableName: string;
};

export type OrderStatus =
  | "RECEIVED_BY_RESTAURANT"
  | "DENIED"
  | "REQUESTED_BY_CUSTOMER"
  | "READY"
  | "PAYED";
export const OrderStatusEnum = {
  RECEIVED_BY_RESTAURANT: "RECEIVED_BY_RESTAURANT",
  DENIED: "DENIED",
  REQUESTED_BY_CUSTOMER: "REQUESTED_BY_CUSTOMER",
  READY: "READY",
  PAYED: "PAYED",
};

export type TNonNullMenuItem = NonNullable<GetMenuItemQuery["getMenuItem"]>;

export type TMenuItemi18nTranslated = TNonNullMenuItem["i18n"][number];

export type TMenuItemTranslated = Omit<TNonNullMenuItem, "i18n"> & {
  i18n: TMenuItemi18nTranslated;
};
