import { Language } from "../API";
import { TMenuItemTranslated, TNonNullMenuItem } from "../types";

export const correctLanguagei18nItem = (
  item: TNonNullMenuItem,
  language: Language
): TMenuItemTranslated => {
  const foundItemsCorrectLanguage = item!.i18n.find(
    (translation) => translation.language === language
  );
  return foundItemsCorrectLanguage && foundItemsCorrectLanguage.name
    ? {
        ...item,
        i18n: foundItemsCorrectLanguage,
      }
    : {
        ...item,
        i18n: item!.i18n[0],
      };
};
