import { Currency, Language } from "../API";
import { convertNumberToPrecision } from "./numberToPrecision";

export const priceDisplay = (currency: Currency, price: number, language: Language): string => {
  const convertedPrice = convertNumberToPrecision(price);
  switch (currency) {
    case Currency["USD"]:
      return `$ ${convertedPrice}`;
    case Currency["KRW"]:
      return language === Language["ko"] ? `${convertedPrice}원` : `₩ ${convertedPrice}`;
    case Currency["EUR"]:
      return `${convertedPrice} €`;
    default:
      return `${convertedPrice} ${currency}`;
  }
};
