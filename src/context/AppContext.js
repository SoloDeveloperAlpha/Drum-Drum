import React, { createContext, useReducer } from "react";

const initialState = {
  display: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "MOSTRAR_DIS":
      return {
        ...state,
        display: action.display,
      };
    default:
      return state;
  }
};
export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        display: state.display,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
