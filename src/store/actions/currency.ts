import { IRate } from "../types";

export const CURRENCY_LIST_SET = "CURRENCY_LIST_SET";
export const CURRENCY_LIST_FAIL = "CURRENCY_LIST_FAIL";
export const FROM_CURRENCY_SELECT = "FROM_CURRENCY_SELECT";
export const TO_CURRENCY_SELECT = "TO_CURRENCY_SELECT";
export const INITIAL_VALUE_SET = "INITIAL_VALUE_SET";
export const RESULT_VALUE_SET = "RESULT_VALUE_SET";

export interface ISetCurrencyListAction {
  type: string;
  rates: IRate;
}

export const setCurrencyList = (rates: IRate): ISetCurrencyListAction => {
  return {
    type: CURRENCY_LIST_SET,
    rates,
  };
};

export interface IFailCurrencyListAction {
  type: string;
  error: string;
}

export const failCurrencyList = (error: string): IFailCurrencyListAction => {
  return {
    type: CURRENCY_LIST_FAIL,
    error,
  };
};

interface ISelectCurrencyAction {
  type: string;
  id: string;
}

export const selectFromCurrency = (id: string): ISelectCurrencyAction => {
  return {
    type: FROM_CURRENCY_SELECT,
    id,
  };
};

export const selectToCurrency = (id: string): ISelectCurrencyAction => {
  return {
    type: TO_CURRENCY_SELECT,
    id,
  };
};

interface ISetValueAction {
  type: string;
  value: number;
}

export const initialValueSet = (value: number): ISetValueAction => {
  return {
    type: INITIAL_VALUE_SET,
    value,
  };
};

export const resultValueSet = (value: number): ISetValueAction => {
  return {
    type: RESULT_VALUE_SET,
    value,
  };
};
