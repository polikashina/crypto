import { createSelector } from "reselect";
import { ICurrencyState, ICurrency, ICurrencyTrend } from "../types";
import { roundValue } from "../reducers/currency";

const fromCurrency = (state: ICurrencyState): string => state.converter.fromCurrency;
const toCurrency = (state: ICurrencyState): string => state.converter.toCurrency;
const currencyList = (state: ICurrencyState): ICurrency[] => state.currencyList;

export const getCurrencyToList = createSelector([currencyList, fromCurrency], (list, fromCurrency): ICurrency[] => {
  return list.filter(item => item.id !== fromCurrency);
});

export const getCurrencyFromList = createSelector([currencyList, toCurrency], (list, toCurrency): ICurrency[] => {
  return list.filter(item => item.id !== toCurrency);
});

export const getCurrencyRates = createSelector([currencyList], (list): ICurrencyTrend[] => {
  const newList: ICurrencyTrend[] = [...list];
  const filteredList = newList.filter(item => {
    item.rate = roundValue(item.rate);
    if (item.previousRate) {
      item.delta = roundValue(item.rate - item.previousRate);
    }
    return item.id !== "USD";
  });

  return filteredList;
});
