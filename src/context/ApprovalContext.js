import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
// import _ from 'lodash';


const approvalReducer = (state, action) => {
  switch(action) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
}


const decideApproval = dispatch => async(loanId, decisionData) => {
  dispatch({ type: 'set_loading', payload: true });
  try {
    console.log('approval works');
    const token = resolveToken();
    const response = await gypsy.post(`/user/loan/action/${loanId}`, decisionData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: 'set_loading', payload: false });
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


export const { Context, Provider } = createDataContext(
  approvalReducer,
  { decideApproval },
  { loading: false, error: null }
)