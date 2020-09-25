import { ItemOptionChoiceInput } from "../../API";
import { TCartItem, TStore } from "../../store/types";
import { TMenuComponentTranslated, TMenuItemTranslated } from "../../types";
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
