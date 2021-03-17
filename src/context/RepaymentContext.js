import createDataContext from "./createDataContext";
import gypsy from "../api/gypsy-web";
import resolveToken from "../utils/resolveToken";

const repaymentReducer = (state, action) => {
  switch (action.type) {
    case "set_loading":
      return { ...state, loading: action.payload };
    case "set_error":
      return { ...state, error: action.payload };
    case "set_repayment_status":
      return { ...state, repaymentStatus: action.payload };
    default:
      return state;
  }
};

const setupRepayment = (dispatch) => async (loanId, repayData) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(
      `/user/loan/set_pay/${loanId}`,
      repayData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    dispatch({ type: "set_repayment_status", payload: true });
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message;
      dispatch({
        type: "set_error",
        payload: errorMessage,
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
};

const verifyRepaymentStatus = (dispatch) => async (loanId) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(
      `/paystack/verify/${loanId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message;
      dispatch({
        type: "set_error",
        payload: errorMessage,
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
};

const clearError = (dispatch) => () => {
  dispatch({ type: "set_error", payload: null });
};

const resetRepaymentStatus = (dispatch) => () => {
  dispatch({ type: "set_repayment_status", payload: false });
};

export const { Context, Provider } = createDataContext(
  repaymentReducer,
  { setupRepayment, verifyRepaymentStatus, clearError, resetRepaymentStatus },
  { loading: false, error: null, repaymentStatus: false }
);
