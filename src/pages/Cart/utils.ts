import { CreateOrderMutation } from "../../API";
import { TCartItem, TStore } from "../../store/types";
import { enhEcommBase } from "../../utils/analytics";

export const analyticsPurchase = (order: NonNullable<CreateOrderMutation["createOrder"]>) => {
  enhEcommBase({
    event: "transaction",
    ecommerce: {
      purchase: {
        actionField: {
          id: order.id, // Transaction ID. Required [Combination of Country, City, Name or Affiliation and Table  can be useful to understand the transaction]
          affiliation: order.propertyName,
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

export const analyticsRemoveFromCart = (product: TCartItem) => {
  enhEcommBase({
    event: "removeFromCart",
    ecommerce: {
      remove: {
        // 'remove' actionFieldObject measures.
        products: [
          {
            //  removing a product to a shopping cart.
            id: product.id,
            price: product.price.toString(),
            brand: product.propertyName,
            // 'category': 'Apparel',
            // 'variant': 'Gray',
            quantity: product.quantity,
          },
        ],
      },
    },
  });
};
