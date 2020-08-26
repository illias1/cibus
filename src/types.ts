export type TParams = {
  restaurantNameUrl: string;
  tableName: string;
};

export type OrderStatus = "ACCEPTED" | "REJECTED" | "AWAITING" | "COMPLETED";

export type TItems = {
  title: string;
  price: number;
  ingredients: string[];
  cal: string;
  allergy: string[];
  notes: string[];
  img: string;
};
