import React, {createContext, useReducer } from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default (reducer, actions, initialState, persist, saveData) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {}

    for(let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
    )
  }

  return { Context, Provider }
}