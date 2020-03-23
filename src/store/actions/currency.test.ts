import {
  CURRENCY_LIST_SET,
  CURRENCY_LIST_FAIL,
  FROM_CURRENCY_SELECT,
  TO_CURRENCY_SELECT,
  INITIAL_VALUE_SET,
  RESULT_VALUE_SET,
  setCurrencyList,
  failCurrencyList,
  selectFromCurrency,
  selectToCurrency,
  initialValueSet,
  resultValueSet,
} from "./currency";
import { IRate } from "../types";

describe("currency action", () => {
  it("should create an action to set currency list", () => {
    const rates: IRate = { USD: 1, BCH: 240, BNB: 14 };
    const expectedAction = {
      type: CURRENCY_LIST_SET,
      rates,
    };

    expect(setCurrencyList(rates)).toEqual(expectedAction);
  });

  it("should create an action to set an error", () => {
    const error = "Invalid API key";
    const expectedAction = {
      type: CURRENCY_LIST_FAIL,
      error,
    };

    expect(failCurrencyList(error)).toEqual(expectedAction);
  });

  it("should select initial currency for conversion", () => {
    const id = "USD";
    const expectedAction = {
      type: FROM_CURRENCY_SELECT,
      id,
    };

    expect(selectFromCurrency(id)).toEqual(expectedAction);
  });

  it("should select target currency for conversion", () => {
    const id = "USD";
    const expectedAction = {
      type: TO_CURRENCY_SELECT,
      id,
    };

    expect(selectToCurrency(id)).toEqual(expectedAction);
  });

  it("should set initial value for conversion", () => {
    const value = 100;
    const expectedAction = {
      type: INITIAL_VALUE_SET,
      value,
    };

    expect(initialValueSet(value)).toEqual(expectedAction);
  });

  it("should set result value for conversion", () => {
    const value = 100;
    const expectedAction = {
      type: RESULT_VALUE_SET,
      value,
    };

    expect(resultValueSet(value)).toEqual(expectedAction);
  });
});
