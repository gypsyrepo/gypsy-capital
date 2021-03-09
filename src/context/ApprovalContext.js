import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
import history from '../utils/history';
// import _ from 'lodash';


const approvalReducer = (state, action) => {
  switch(action) {
    default:
      return state;
  }
}


const decideApproval = dispatch => async(loanId, decisionData) => {
  dispatch({ type: 'set_loading', payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post(`/user/loan/action/${loanId}`, decisionData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data);
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
  { loading: false }
)