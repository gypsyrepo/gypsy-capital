import React, { createContext, useReducer, useEffect } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (reducer, actions, initialState, persist, saveData) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => {
      const savedLoanId = sessionStorage.getItem("gypsy-currentLoanId");
      return {
        ...initialState,
        currentLoanId: savedLoanId ? savedLoanId : null,
      };
    });

    useEffect(() => {
      if (saveData) {
        saveData(state);
      }
    }, [state]);

    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
