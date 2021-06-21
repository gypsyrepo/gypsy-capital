import createDataContext from "./createDataContext";

const dataReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const calculateLoan = (dispatch) => async () => {};

export const { Context, Provider } = createDataContext(
  dataReducer,
  { calculateLoan },
  { loading: false }
);
