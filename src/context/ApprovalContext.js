import createDataContext from "./createDataContext";
import gypsy from "../api/gypsy-web";
import resolveToken from "../utils/resolveToken";
// import _ from 'lodash';

const approvalReducer = (state, action) => {
  switch (action.type) {
    case "set_loading":
      return { ...state, loading: action.payload };
    case "set_error":
      return { ...state, error: action.payload };
    case "set_disburse_status":
      return { ...state, disbursedStatus: action.payload };
    case "set_approval_status":
      return { ...state, approvedStatus: action.payload };
    default:
      return state;
  }
};

const decideApproval = (dispatch) => async (loanId, decisionData) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    console.log(decisionData);
    const token = resolveToken();
    const response = await gypsy.post(
      `/user/loan/action/${loanId}`,
      decisionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    dispatch({ type: "set_approval_status", payload: true });
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

const disburseLoan = (dispatch) => async (loanId, paymentData) => {
  console.log(paymentData);
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(
      `/payment/transfer/${loanId}`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    dispatch({ type: "set_disburse_status", payload: true });
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

const resetApprovalStatus = (dispatch) => () => {
  dispatch({ type: "set_approval_status", payload: false });
};

const resetDisburseStatus = (dispatch) => () => {
  dispatch({ type: "set_disburse_status", payload: false });
};

export const { Context, Provider } = createDataContext(
  approvalReducer,
  {
    decideApproval,
    disburseLoan,
    clearError,
    resetApprovalStatus,
    resetDisburseStatus,
  },
  { loading: false, error: null, disbursedStatus: false, approvedStatus: false }
);
