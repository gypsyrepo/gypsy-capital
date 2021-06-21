import createDataContext from "./createDataContext";
import gypsy from "../api/gypsy-web";
import resolveToken from "../utils/resolveToken";
import { numberWithCommas } from "../utils/nigeriaStates";

const repaymentReducer = (state, action) => {
  switch (action.type) {
    case "set_loading":
      return { ...state, loading: action.payload };
    case "set_payment_loading":
      return { ...state, paymentLoading: action.payload };
    case "set_payment_error":
      return { ...state, paymentError: action.payload };
    case "set_error":
      return { ...state, error: action.payload };
    case "set_repayment_status":
      return { ...state, repaymentStatus: action.payload };
    case "set_message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const setupRepayment = (dispatch) => async (loanId, repayData, callback) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    await gypsy.post(
      `/user/loan/set_pay/${loanId}`,
      repayData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (callback) {
      await callback(loanId);
    }
    dispatch({ type: "set_repayment_status", payload: true });
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    if (err.response) {
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
    await gypsy.post(
      `/paystack/verify/${loanId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    if (err.response) {
      // const errorMessage = err.response.data.error || err.response.data.message;
      // dispatch({
      //   type: "set_error",
      //   payload: errorMessage,
      // });
      dispatch({ type: "set_loading", payload: false });
    }
  }
};

const manualPayment = (dispatch) => async (scheduleId, paymentData) => {
  dispatch({ type: "set_payment_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(
      `/paystack/outside_pay/${scheduleId}`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "set_message",
      payload: `Manual repayment for the amount of N${numberWithCommas(
        response.data.data.amount
      )} was processed successfully`,
    });
    dispatch({ type: "set_payment_loading", payload: false });
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || err.response.data.message;
      dispatch({
        type: "set_payment_error",
        payload: errorMessage,
      });
      dispatch({ type: "set_payment_loading", payload: false });
    }
  }
};

const validateRemitaMandate = (dispatch) => async (loanId, validateData) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    await gypsy.post(
      `/remita/mandate/validate_otp/${loanId}`,
      validateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {
    if (err.response) {
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

const clearPaymentError = (dispatch) => () => {
  dispatch({ type: "set_payment_error", payload: null });
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "set_message", payload: null });
};

const resetRepaymentStatus = (dispatch) => () => {
  dispatch({ type: "set_repayment_status", payload: false });
};

export const { Context, Provider } = createDataContext(
  repaymentReducer,
  {
    setupRepayment,
    verifyRepaymentStatus,
    clearError,
    resetRepaymentStatus,
    manualPayment,
    clearPaymentError,
    clearMessage,
    validateRemitaMandate,
  },
  {
    loading: false,
    error: null,
    repaymentStatus: false,
    paymentLoading: false,
    paymentError: null,
    message: null,
  }
);
