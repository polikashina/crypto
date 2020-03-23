import React, { useCallback } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "@material-ui/core";
import { IState, ICurrencyTrend } from "../store/types";
import { selectFromCurrency } from "../store/actions/currency";
import { getCurrencyRates } from "../store/selectors/currency";
import cn from "classnames";
import "./Sidebar.scss";

type StateProps = {
  currencyList: ICurrencyTrend[];
};

type DispatchProps = {
  selectFromCurrency: (id: string) => void;
};

type Props = StateProps & DispatchProps;

const SidebarPresenter: React.FC<Props> = props => {
  const { currencyList, selectFromCurrency } = props;

  const selectCurrency = useCallback(
    (id: string) => {
      selectFromCurrency(id);
    },
    [selectFromCurrency],
  );

  return (
    <section className="sidebar">
      <List className="sidebar__list">
        {currencyList &&
          currencyList.map(item => (
            <ListItem key={item.id} button={true} onClick={() => selectCurrency(item.id)} className="sidebar__row">
              <span className="sidebar__currency">{item.id}</span>
              <span className="sidebar__rate">{item.rate}</span>
              {item.delta && item.delta !== 0 ? (
                <span
                  className={cn("sidebar__delta", {
                    "sidebar__delta-up": item.delta > 0,
                    "sidebar__delta-down": item.delta < 0,
                  })}
                >
                  {item.delta}
                </span>
              ) : (
                ""
              )}
            </ListItem>
          ))}
      </List>
    </section>
  );
};

const mapStateToProps = (state: IState): StateProps => {
  const { currency } = state;

  return {
    currencyList: getCurrencyRates(currency),
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    selectFromCurrency: (id: string) => dispatch(selectFromCurrency(id)),
  };
};

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarPresenter);

export { Sidebar };
