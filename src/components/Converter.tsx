import React, { useCallback } from "react";
import { connect } from "react-redux";
import { TextField, Select, MenuItem } from "@material-ui/core";
import { getCurrencyToList, getCurrencyFromList } from "../store/selectors/currency";
import { IState, ICurrency } from "../store/types";
import { selectFromCurrency, selectToCurrency, initialValueSet, resultValueSet } from "../store/actions/currency";
import "./Converter.scss";

type StateProps = {
  currencyToList: ICurrency[];
  currencyFromList: ICurrency[];
  fromCurrency?: string;
  toCurrency?: string;
  initialValue?: number;
  resultValue?: number;
};

type DispatchProps = {
  selectFromCurrency: (id: string) => void;
  selectToCurrency: (id: string) => void;
  initialValueSet: (value: number) => void;
  resultValueSet: (value: number) => void;
};

type Props = StateProps & DispatchProps;

const ConverterPresenter: React.FC<Props> = props => {
  const {
    currencyToList,
    currencyFromList,
    fromCurrency,
    toCurrency,
    initialValue = "",
    resultValue = "",
    selectFromCurrency,
    selectToCurrency,
    initialValueSet,
    resultValueSet,
  } = props;

  const onInitialValueChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      initialValueSet(Number(event.target.value));
    },
    [initialValueSet],
  );

  const onResultValueChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      resultValueSet(Number(event.target.value));
    },
    [resultValueSet],
  );

  const onFromCurrencyChangeHandler = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      selectFromCurrency(String(event.target.value));
    },
    [selectFromCurrency],
  );

  const onToCurrencyChangeHandler = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      selectToCurrency(String(event.target.value));
    },
    [selectToCurrency],
  );

  return (
    <section className="converter">
      <div className="converter__column">
        <TextField
          type="number"
          value={initialValue}
          className="converter__control"
          inputProps={{ maxLength: 6 }}
          onChange={onInitialValueChangeHandler}
        />
        <TextField
          type="number"
          value={resultValue}
          className="converter__control"
          inputProps={{ maxLength: 6 }}
          color="primary"
          onChange={onResultValueChangeHandler}
        />
      </div>
      <div className="converter__column">
        <Select className="converter__control" value={fromCurrency} onChange={onFromCurrencyChangeHandler}>
          {currencyFromList.map(item => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            );
          })}
        </Select>
        <Select className="converter__control" value={toCurrency} onChange={onToCurrencyChangeHandler}>
          {currencyToList.map(item => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </section>
  );
};

const mapStateToProps = (state: IState): StateProps => {
  const { currency } = state;
  const { fromCurrency, toCurrency, initialValue, resultValue } = currency.converter;
  return {
    currencyToList: getCurrencyToList(currency),
    currencyFromList: getCurrencyFromList(currency),
    fromCurrency,
    toCurrency,
    initialValue,
    resultValue,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    selectFromCurrency: (id: string) => dispatch(selectFromCurrency(id)),
    selectToCurrency: (id: string) => dispatch(selectToCurrency(id)),
    initialValueSet: (value: number) => dispatch(initialValueSet(value)),
    resultValueSet: (value: number) => dispatch(resultValueSet(value)),
  };
};

const Converter = connect(mapStateToProps, mapDispatchToProps)(ConverterPresenter);

export { Converter };
