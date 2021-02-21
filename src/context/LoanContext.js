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
    case 'set_current_loan':
      return { ...state, currentLoanId: action.payload }
    case 'set_incomplete_state':
      return { ...state, incomplete: action.payload }
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
    dispatch({ type: 'set_current_loan', payload: response.data.data.loanId })
    dispatch({ type: 'set_application_stage', payload: 'calculated' });
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/consumer-credit/apply/contact-info');
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      if(errorMessage.toLowerCase() === "complete your previuos loan request") {
        // console.log(errorMessage);
        const { loanId, data: stage } = err.response.data.data;
        dispatch({ type: 'set_current_loan', payload: loanId });
        dispatch({ type: 'set_incomplete_state', payload: true });
        if(stage === "address") {
          dispatch({ type: 'set_application_stage', payload: 'calculated' });
        }
        if(stage === "work") {
          dispatch({ type: 'set_application_stage', payload: 'address_added' });
        }
        if(stage === "bank") {
          dispatch({ type: 'set_application_stage', payload: 'employer_added' });
        }
      } else {
        dispatch({
          type: 'set_error',
          payload: errorMessage
        });
      }
    }
    dispatch({ type: "set_loading", payload: false });
  }
}


const addAddressForLoan = dispatch => async(addressData, loanId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/client/loan/address/${loanId}`, addressData, {
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


const addWorkInfoForLoan = dispatch => async(workData, loanId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken()
    const response = await gypsy.post(`/client/loan/work/${loanId}`, workData, {
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


const addBankInfoForLoan = dispatch => async(bankData, loanId, inModal) => {
  dispatch({ type: "set_loading", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/client/loan/bank/${loanId}`, bankData, {
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


const clearCompleteState = dispatch => () => {
  dispatch({
    type: 'set_incomplete_state',
    payload: false
  })
}


export const { Context, Provider } = createDataContext(
  loanReducer,
  { loanApply, addAddressForLoan, addWorkInfoForLoan, clearError, retrieveClientLoans, addBankInfoForLoan, clearCompleteState },
  { loading: false, error: null, loans: [], loanDetails: null, loanApplicationStage: null, currentLoanId: null, incomplete: false }
)