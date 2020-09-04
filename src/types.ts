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
export type TItems = {
  title: string;
  price: number;
  ingredients: string[];
  cal: string;
  allergy: string[];
  notes: string[];
  img: string;
};
