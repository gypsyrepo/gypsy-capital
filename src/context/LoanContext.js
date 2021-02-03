import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';


const loanReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state; 
  }
}



const loanApply = dispatch => async(applyData, userId) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/client/loan/apply/${userId}`, applyData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    dispatch({
      type: 'set_error',
      payload: err.message
    });
    dispatch({ type: "set_loading", payload: false });
  }
}


export const { Context, Provider } = createDataContext(
  loanReducer,
  { loanApply },
  { loading: false, error: null, loans: [], loanDetails: null }
)