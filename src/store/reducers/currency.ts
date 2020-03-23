import {
  CURRENCY_LIST_SET,
  CURRENCY_LIST_FAIL,
  FROM_CURRENCY_SELECT,
  TO_CURRENCY_SELECT,
  INITIAL_VALUE_SET,
  RESULT_VALUE_SET,
} from "../actions/currency";
import { ICurrencyState, ICurrency, IRate } from "../types";

const initialState: ICurrencyState = {
  currencyList: [],
  converter: {
    fromCurrency: "",
    toCurrency: "",
  },
  isLoading: true,
};

const targetCurrency = "USD";
const targetRate = { id: targetCurrency, rate: 1 };

export const getDefaultCurrency = (list: ICurrency[], exception: string): string => {
  const newList = list.filter(item => item.id !== exception);

  return newList[0].id;
};

export const roundValue = (value: number): number => {
  return Math.round(value * 100) / 100;
};

const getRateById = (list: ICurrency[], id: string): number => {
  return list.find(item => item.id === id)!.rate;
};

export const currencyReducer = (state: ICurrencyState = initialState, action: any): ICurrencyState => {
  switch (action.type) {
    case CURRENCY_LIST_SET: {
      const { rates } = action;
      const oldRates: IRate = {};
      const currencyList: ICurrency[] = [targetRate];

      state.currencyList.forEach(({ id, rate }) => {
        oldRates[id] = rate;
      });

      for (let id in rates) {
        currencyList.push({ id, rate: rates[id], previousRate: oldRates[id] });
      }

      return {
        ...state,
        isLoading: false,
        currencyList,
        converter: {
          ...state.converter,
          fromCurrency: getDefaultCurrency(currencyList, targetCurrency),
          toCurrency: targetCurrency,
        },
        error: undefined,
      };
    }
    case CURRENCY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case FROM_CURRENCY_SELECT:
      if (action.id === state.converter.toCurrency) {
        return {
          ...state,
          converter: {
            ...state.converter,
            fromCurrency: action.id,
            toCurrency: targetCurrency,
            initialValue: undefined,
            resultValue: undefined,
          },
        };
      }
      return {
        ...state,
        converter: {
          ...state.converter,
          fromCurrency: action.id,
          initialValue: undefined,
          resultValue: undefined,
        },
      };
    case TO_CURRENCY_SELECT:
      return {
        ...state,
        converter: {
          ...state.converter,
          toCurrency: action.id,
          initialValue: undefined,
          resultValue: undefined,
        },
      };
    case INITIAL_VALUE_SET: {
      const { currencyList, converter } = state;
      const { fromCurrency, toCurrency } = converter;
      const resultValue = roundValue(
        (action.value * getRateById(currencyList, fromCurrency)) / getRateById(currencyList, toCurrency),
      );

      return {
        ...state,
        converter: {
          ...state.converter,
          initialValue: action.value,
          resultValue,
        },
      };
    }
    case RESULT_VALUE_SET: {
      const { currencyList, converter } = state;
      const { fromCurrency, toCurrency } = converter;
      const initialValue = roundValue(
        (action.value * getRateById(currencyList, toCurrency)) / getRateById(currencyList, fromCurrency),
      );

      return {
        ...state,
        converter: {
          ...state.converter,
          initialValue,
          resultValue: action.value,
        },
      };
    }

    default:
      return state;
  }
};
