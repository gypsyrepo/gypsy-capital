import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
import history from '../utils/history';


const loanReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    case 'set_application_stage':
      return { ...state, loanApplicationStage: action.payload }
    case 'set_loan_list':
      return { ...state, loans: action.payload }
    default:
      return state; 
  }
}



const loanApply = dispatch => async(applyData, userId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/client/loan/apply/${userId}`, applyData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: 'set_application_stage', payload: 'calculated' });
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/consumer-credit/apply/contact-info');
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_error',
        payload: errorMessage
      });
    }
    dispatch({ type: "set_loading", payload: false });
  }
}


const addAddressForLoan = dispatch => async(addressData, userId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/client/loan/address/${userId}`, addressData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: 'set_application_stage', payload: 'address_added' });
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/consumer-credit/apply/employer-info');
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_error',
        payload: errorMessage
      });
    }
    dispatch({ type: "set_loading", payload: false });
  }
}


const addWorkInfoForLoan = dispatch => async(workData, userId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken()
    const response = await gypsy.post(`/client/loan/work/${userId}`, workData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: 'set_application_stage', payload: 'employer_added' });
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/consumer-credit/apply/bank-info');
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_error',
        payload: errorMessage
      });
    }
    dispatch({ type: "set_loading", payload: false })
  }
}


const addBankInfoForLoan = dispatch => async(bankData, userId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/client/loan/bank/${userId}`, bankData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: 'set_application_stage', payload: 'bank_added' });
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/consumer-credit/success');
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_error',
        payload: errorMessage
      });
    }
    dispatch({ type: "set_loading", payload: false })
  }
}


const retrieveClientLoans = dispatch => async() => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.get('/client/loan/view', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data.data)
    dispatch({
      type: 'set_loan_list',
      payload: response.data.data
    })
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


const clearError = dispatch => () => {
  dispatch({
    type: 'set_error',
    payload: null
  })
}


export const { Context, Provider } = createDataContext(
  loanReducer,
  { loanApply, addAddressForLoan, addWorkInfoForLoan, clearError, retrieveClientLoans, addBankInfoForLoan },
  { loading: false, error: null, loans: [], loanDetails: null, loanApplicationStage: null }
)