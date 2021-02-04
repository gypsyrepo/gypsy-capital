import React, {createContext, useReducer, useEffect } from 'react';


export default (reducer, actions, initialState, persist, saveData) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => {
      if(persist) {
        const localData = localStorage.getItem('gypsy');
        return localData ? JSON.parse(localData) : []
      }
    });

    useEffect(() => {
      if(persist) {
        saveData(state);
        // console.log(state);
      }
    }, [state])

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