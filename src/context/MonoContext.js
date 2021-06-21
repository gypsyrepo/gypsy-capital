import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
// import history from '../utils/history';
// import _ from 'lodash';


const monoReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'set_statement_loading':
      return { ...state, statementLoading: action.payload }
    case 'set_statement_pdf':
      return { ...state, statementPdf: action.payload }
    case 'set_account_info':
      return { ...state, accountInfo: action.payload }
    case 'set_mono_status':
      return { ...state, monoStatus: action.payload }
    case 'set_transaction_history':
      return { ...state, transactionHistory: action.payload }
    case 'set_info_loading':
      return { ...state, infoLoading: action.payload }
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
    await gypsy.post(`/api/mono/get_id/${userId}`, {mono_code: code}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch({ type: 'set_link_success', payload: true });
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
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
  dispatch({ type: "set_info_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/api/mono/account_info/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch({
      type: 'set_account_info',
      payload: response.data.data
    })
    dispatch({ type: "set_info_loading", payload: false });
  } catch(err) {
    if(err.response) {
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_account_info',
        payload: null
      })
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: "set_info_loading", payload: false });
    }
  }
}

const checkMonoStatus = dispatch => async(userId) => {
  try {
    const token = resolveToken()
    const response = await gypsy.get(`/api/mono/account_info/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if(response.data.data) {
      dispatch({
        type: 'set_mono_status',
        payload: 'active'
      })
    } else {
      dispatch({
        type: 'set_mono_status',
        payload: 'inactive'
      })
    }
  } catch(err) {
    dispatch({
      type: 'set_mono_status',
      payload: 'inactive'
    })
  }
}

const getAccountStatement = dispatch => async(userId, months) => {
  dispatch({ type: "set_statement_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/api/mono/account_statement/${userId}/${months}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch({ type: "set_statement_pdf", payload: response.data.data.path})
    dispatch({ type: "set_statement_loading", payload: false });
  } catch(err) {
    if(err.response) {
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: "set_statement_loading", payload: false });
    }
  }
}

const getAccountTransactionHistory = dispatch => async(userId, period) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/api/mono/transaction_history/${userId}`, period,  {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch({
      type: "set_transaction_history",
      payload: response.data.data
    });
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
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
  { authenticateUser, resetLinkSuccess, clearErrors, getAccountInfo, getAccountStatement, getAccountTransactionHistory, checkMonoStatus },
  { statementLoading: false, infoLoading: false, error: null, linkSuccess: false, loading: false, statementPdf: null, accountInfo: null, accountHistory: null, monoStatus: null, transactionHistory: null }
)