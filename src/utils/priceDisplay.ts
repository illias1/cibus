import { Currency, Language } from "../API";

export const priceDisplay = (
  currency: Currency,
  price: number,
  language: Language,
  precision: number = 2
): string => {
  switch (currency) {
    case Currency["USD"]:
      return `$ ${price}`;
    case Currency["KRW"]:
      return language === Language["ko"] ? `${price}원` : `$₩ {price}`;
    default:
      return `${price.toFixed(precision)} ${currency}`;
  }
};
