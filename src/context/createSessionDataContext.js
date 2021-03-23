import React, { createContext, useReducer, useEffect } from "react";

export default (reducer, actions, initialState, persist, saveData) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => {
      if (persist) {
        const localData = sessionStorage.getItem("gypsyLoanData");
        return localData
          ? JSON.parse(localData)
          : {
              decision: null,
              approvedPayDay: "",
              repaymentStartDate: "",
              approvedLoanAmount: "",
              approvedTenure: null,
              approvedDti: 33,
              approvedMonthlyRepayment: "",
              totalRepayment: "",
              repaymentApi: null,
              bank: "",
              accountNumber: "",
              decisionReason: "",
              approvedInterest: "",
              adminFee: "",
            };
      }
    });

    useEffect(() => {
      if (persist) {
        saveData(state);
        // console.log(state);
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
