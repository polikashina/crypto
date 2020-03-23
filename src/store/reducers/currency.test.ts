import { currencyReducer, getDefaultCurrency } from "./currency";
import { ICurrencyState, IRate } from "../types";
import {
  setCurrencyList,
  failCurrencyList,
  selectFromCurrency,
  selectToCurrency,
  initialValueSet,
  resultValueSet,
} from "../actions/currency";

const initialState: ICurrencyState = {
  currencyList: [],
  converter: {
    fromCurrency: "",
    toCurrency: "",
  },
  isLoading: true,
};

describe("currency reducer", () => {
  it("should return itial state", () => {
    expect(currencyReducer(undefined, {})).toEqual(initialState);
  });

  it("should set currency list", () => {
    const rates: IRate = { BCH: 240, BNB: 14 };
    const currencyList = [
      { id: "USD", rate: 1, previousRate: undefined },
      { id: "BCH", rate: 240, previousRate: undefined },
      { id: "BNB", rate: 14, previousRate: undefined },
    ];
    const targetRate = "USD";
    const resultState: ICurrencyState = {
      currencyList,
      converter: {
        fromCurrency: getDefaultCurrency(currencyList, targetRate),
        toCurrency: targetRate,
      },
      isLoading: false,
      error: undefined,
    };

    expect(currencyReducer(initialState, setCurrencyList(rates))).toEqual(resultState);
  });

  it("should update currency list", () => {
    const initialState: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "",
        toCurrency: "",
      },
      isLoading: true,
    };
    const rates: IRate = { BCH: 242, BNB: 13 };
    const targetRate = "USD";
    const currencyList = [
      { id: "USD", rate: 1 },
      { id: "BCH", rate: 242, previousRate: 240 },
      { id: "BNB", rate: 13, previousRate: 14 },
    ];
    const resultState: ICurrencyState = {
      currencyList,
      converter: {
        fromCurrency: getDefaultCurrency(currencyList, targetRate),
        toCurrency: targetRate,
      },
      isLoading: false,
      error: undefined,
    };

    expect(currencyReducer(initialState, setCurrencyList(rates))).toEqual(resultState);
  });

  it("should set error", () => {
    const error = "Invalid API key";

    const resultState: ICurrencyState = {
      currencyList: [],
      converter: {
        fromCurrency: "",
        toCurrency: "",
      },
      isLoading: false,
      error,
    };

    expect(currencyReducer(initialState, failCurrencyList(error))).toEqual(resultState);
  });

  it("should set from currency", () => {
    const value = "USD";
    const resultState: ICurrencyState = {
      currencyList: [],
      converter: {
        fromCurrency: value,
        toCurrency: "",
        initialValue: undefined,
        resultValue: undefined,
      },
      isLoading: true,
    };

    expect(currencyReducer(initialState, selectFromCurrency(value))).toEqual(resultState);
  });

  it("should set from currency when from currency is qual to target currency", () => {
    const value = "BCH";
    const targetRate = "USD";
    const initialState: ICurrencyState = {
      currencyList: [],
      converter: {
        fromCurrency: "",
        toCurrency: value,
      },
      isLoading: true,
    };
    const resultState: ICurrencyState = {
      currencyList: [],
      converter: {
        fromCurrency: value,
        toCurrency: targetRate,
        initialValue: undefined,
        resultValue: undefined,
      },
      isLoading: true,
    };

    expect(currencyReducer(initialState, selectFromCurrency(value))).toEqual(resultState);
  });

  it("should set target currency", () => {
    const value = "BCH";
    const resultState: ICurrencyState = {
      currencyList: [],
      converter: {
        fromCurrency: "",
        toCurrency: value,
        initialValue: undefined,
        resultValue: undefined,
      },
      isLoading: true,
    };

    expect(currencyReducer(initialState, selectToCurrency(value))).toEqual(resultState);
  });

  it("should set initial value for conterver", () => {
    const value = 100;
    const initialState: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "BCH",
        toCurrency: "USD",
      },
      isLoading: false,
    };
    const resultState: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "BCH",
        toCurrency: "USD",
        initialValue: value,
        resultValue: 24000,
      },
      isLoading: false,
    };

    expect(currencyReducer(initialState, initialValueSet(value))).toEqual(resultState);
  });

  it("should set result value for conterver", () => {
    const value = 500;
    const initialState: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "BCH",
        toCurrency: "USD",
      },
      isLoading: false,
    };
    const resultState: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "BCH",
        toCurrency: "USD",
        initialValue: 2.08,
        resultValue: value,
      },
      isLoading: false,
    };

    expect(currencyReducer(initialState, resultValueSet(value))).toEqual(resultState);
  });
});
