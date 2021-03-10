import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
import history from '../utils/history';
// import _ from 'lodash';


const monoReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    case 'set_link_success':
      return { ...state, linkSuccess: action.payload }
    case 'clear_errors':
      return { ...state, error: action.payload }
    default:
      return state;
  }
}


const authenticateUser = dispatch => async(userId, code) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/api/mono/get_id/${userId}`, {mono_code: code}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data);
    dispatch({ type: 'set_link_success', payload: true });
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}

const getAccountInfo = dispatch => async(userId) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/api/mono/account_info/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data.data);
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}


const getAccountStatement = dispatch => async(userId, months) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/api/mono/account_statement/${userId}/${months}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data);
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}

const getAccountTransactionHistory = dispatch => async(userId) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/api/mono/transaction_history/${userId}`,   )
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}

const resetLinkSuccess = dispatch => () => {
  dispatch({ type: 'set_link_success', payload: false });
}

const clearErrors = dispatch => () => {
  dispatch({ type: 'clear_errors', payload: null });
}


export const { Context, Provider } = createDataContext(
  monoReducer,
  { authenticateUser, resetLinkSuccess, clearErrors, getAccountInfo, getAccountStatement },
  { loading: false, error: null, linkSuccess: false }
)