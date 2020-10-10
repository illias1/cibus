import { ItemOptionChoiceInput } from "../../API";
import { TCartItem, TStore } from "../../store/types";
import { TMenuComponentTranslated, TMenuItemTranslated } from "../../types";
import { dataLayerPush } from "../../utils/analytics";
import { TComponentChoice } from "./components/ItemPopup";

export const prepareItemToAddToCart = (
  foundComps: TMenuComponentTranslated[],
  data: TComponentChoice,
  item: TMenuItemTranslated,
  quantity: number,
  customerComment: string
) => {
  const options: TStore["cart"][number]["options"] = foundComps.map((comp) => ({
    id: comp.id,
    label: comp.translations.label,
    optionChoice:
      typeof data[comp.id] === "string"
        ? [comp.translations.optionChoice[data[comp.id] as number]]
        : (data[comp.id] as boolean[]).reduce(
            (selectedoptionChoices, checked, index) =>
              checked
                ? [...selectedoptionChoices, comp.translations.optionChoice[index]]
                : selectedoptionChoices,
            [] as ItemOptionChoiceInput[]
          ),
  }));
  const preparedItem = {
    ...item,
    quantity,
    customerComment,
    optionsTotalPrice: options.reduce(
      (compTotal, comp) =>
        compTotal +
        comp.optionChoice.reduce(
          (optionsTotal, option) => optionsTotal + (option.addPrice || 0),
          0
        ),
      0
    ),
    options,
  };
  return preparedItem;
};

export const getRadioDefaultValue = (
  translations: TMenuComponentTranslated["translations"],
  thisItemInCart: TCartItem | undefined,
  index: number
) => {
  return (translations.optionChoice.findIndex(
    (option) => option.name === thisItemInCart?.options[index].optionChoice[0].name
  ) > -1
    ? translations.optionChoice.findIndex(
        (option) => option.name === thisItemInCart?.options[index].optionChoice[0].name
      )
    : 0
  ).toString();
};

export const analyticsDetailView = (product: TMenuItemTranslated) => {
  dataLayerPush({
    event: "productDetailView",
    ecommerce: {
      detail: {
        products: [
          {
            id: product.id,
            price: product.price.toString(),
            brand: product.propertyName,
            // 'category': product.i18n.category,
            // 'variant': 'Gray'
          },
        ],
      },
    },
  });
};
export const analyticsAddToCart = (
  product: TMenuItemTranslated,
  currencyCode: string,
  quantity: number
) => {
  dataLayerPush({
    event: "addToCart",
    ecommerce: {
      currencyCode: currencyCode,
      add: {
        // 'add' actionFieldObject measures.
        products: [
          {
            //  adding a product to a shopping cart.
            id: product.id,
            price: product.price.toString(),
            brand: product.propertyName,
            // 'category': 'Apparel',
            // 'variant': 'Gray',
            quantity: quantity,
          },
        ],
      },
    },
  });
};

export const analyticsCheckout = (cart: TCartItem[], step: number) => {
  dataLayerPush({
    event: "checkout",
    ecommerce: {
      checkout: {
        actionField: { step: step },
        products: cart.map((cartItem) => ({
          id: cartItem.id,
          price: (cartItem.price + cartItem.optionsTotalPrice).toString(),
          brand: cartItem.propertyName,
          // 'category': 'Apparel',
          // 'variant': 'Gray',
          quantity: cartItem.quantity,
        })),
      },
    },
  });
};
