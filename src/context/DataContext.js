import createDataContext from "./createDataContext";
import gypsy from "../api/gypsy-web";
import resolveToken from "../utils/resolveToken";

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
