import { getCurrencyRates, getCurrencyToList, getCurrencyFromList } from "./currency";
import { ICurrencyState } from "../types";

describe("currency selector", () => {
  it("should return values for initial currency", () => {
    const state: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "",
        toCurrency: "BNB",
      },
      isLoading: false,
    };

    const result = [
      { id: "USD", rate: 1 },
      { id: "BCH", rate: 240 },
    ];
    expect(getCurrencyFromList(state)).toEqual(result);
  });

  it("should return values for target currency", () => {
    const state: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240 },
        { id: "BNB", rate: 14 },
      ],
      converter: {
        fromCurrency: "BNB",
        toCurrency: "",
      },
      isLoading: false,
    };

    const result = [
      { id: "USD", rate: 1 },
      { id: "BCH", rate: 240 },
    ];
    expect(getCurrencyToList(state)).toEqual(result);
  });

  it("should return rounded values for rates", () => {
    const state: ICurrencyState = {
      currencyList: [
        { id: "USD", rate: 1 },
        { id: "BCH", rate: 240.8967687, previousRate: 240.70212 },
        { id: "BNB", rate: 14.06643, previousRate: 14.5322 },
      ],
      converter: {
        fromCurrency: "",
        toCurrency: "",
      },
      isLoading: false,
    };

    const result = [
      { id: "BCH", rate: 240.9, previousRate: 240.70212, delta: 0.2 },
      { id: "BNB", rate: 14.07, previousRate: 14.5322, delta: -0.46 },
    ];
    expect(getCurrencyRates(state)).toEqual(result);
  });
});
