import { Dispatch } from "redux";
import { setCurrencyList, failCurrencyList } from "../actions/currency";
import { API_ENDPOINT, API_KEY, ApiRoutes } from "./api";

const symbols = ["BTC", "ETH", "XRP", "USDT", "BCH", "LTC", "BSV", "EOS", "BNB", "XTZ"];

const fetchCurrency = (): Promise<any> => {
  const symbolsStr = symbols.join();
  return fetch(`${API_ENDPOINT}${ApiRoutes.LIVE}?symbols=${symbolsStr}&access_key=${API_KEY}`, {
    method: "GET",
  });
};

export function success() {
  return {
    type: "FETCH_DATA_SUCCESS",
  };
}

export const loadCurrencyList = () => {
  return (dispatch: Dispatch<any>) => {
    return fetchCurrency()
      .then(
        async response => {
          let result = await response.json();
          if (!result.success) {
            throw result.error;
          }
          dispatch(setCurrencyList(result.rates));
        },
        error => dispatch(failCurrencyList(error.toString())),
      )
      .catch(error => dispatch(failCurrencyList(error.info)));
  };
};
