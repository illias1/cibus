import { Currency, ItemOptionChoiceInput, Language } from "../../API";
import { TStore } from "../../store/types";
import { TMenuComponentTranslated, TMenuItemTranslated } from "../../types";
import { TComponentChoice } from "./components/ItemPopup";

export const priceDisplay = (currency: Currency, price: number, language: Language): string => {
  switch (currency) {
    case Currency["USD"]:
      return `$ ${price}`;
    case Currency["KRW"]:
      return language === Language["ko"] ? `${price}원` : `$₩ {price}`;
    default:
      return `${price} ${currency}`;
  }
};

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
