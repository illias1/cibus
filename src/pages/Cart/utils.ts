import { CreateOrderMutation } from "../../API";
import { TStore } from "../../store/types";

export const registerDataLayerTransaction = (
  order: NonNullable<CreateOrderMutation["createOrder"]>,
  address: TStore["property"]["address"]
) => {
  // @ts-ignore
  var dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: "transaction",
    ecommerce: {
      purchase: {
        actionField: {
          id: order.id, // Transaction ID. Required [Combination of Country, City, Name or Affiliation and Table  can be useful to understand the transaction]
          CountryOfTheAffiliation: address?.country,
          CityOfTheAffiliation: address?.city,
          affiliation: order.propertyName,
          TableInTheAffiliation: order.tableName,
          revenue: order.priceTotal, // Total transaction value (incl. tax and shipping)
        },
        products: order.orderItem.map((item) => ({
          name: item.name, // Name or ID is required.
          id: item.id,
          price: (item.price + (item.optionsTotalPrice || 0)).toString(),
          customerComment: item.customerComment,
          quantity: item.quantity,
        })),
      },
    },
  });
};
