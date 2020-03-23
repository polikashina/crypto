export interface IRate {
  [key: string]: number;
}

export interface ICurrency {
  id: string;
  rate: number;
  previousRate?: number;
}

export interface ICurrencyTrend extends ICurrency {
  delta?: number;
}

export interface ICurrencyState {
  currencyList: ICurrency[];
  converter: IConverterState;
  isLoading: boolean;
  error?: string;
}

export interface IConverterState {
  fromCurrency: string;
  toCurrency: string;
  initialValue?: number;
  resultValue?: number;
}

export interface IState {
  currency: ICurrencyState;
}
