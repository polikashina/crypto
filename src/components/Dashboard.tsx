import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Sidebar } from "./Sidebar";
import { Converter } from "./Converter";
import { CircularProgress } from "@material-ui/core";
import { IState } from "../store/types";
import { loadCurrencyList } from "../store/thunks/currency";
import "./Dashboard.scss";

type StateProps = {
  isLoading: boolean;
  error?: string;
};

type DispatchProps = {
  loadCurrencyList: () => void;
};

type Props = StateProps & DispatchProps;

const DashboardPresenter: React.FC<Props> = props => {
  const { isLoading, error, loadCurrencyList } = props;

  useEffect(() => {
    loadCurrencyList();
    const timer = setInterval(() => {
      loadCurrencyList();
    }, 60 * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [loadCurrencyList]);

  return (
    <div className="dashboard">
      {isLoading ? (
        <CircularProgress className="dashboard__loader" />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Converter />
          <Sidebar />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: IState): StateProps => {
  const { currency } = state;
  const { isLoading, error } = currency;

  return {
    isLoading,
    error,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    loadCurrencyList: () => dispatch(loadCurrencyList()),
  };
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardPresenter);

export { Dashboard };
