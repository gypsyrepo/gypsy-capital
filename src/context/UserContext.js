import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
import history from '../utils/history';

const userReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'verify_bvn':
      return { ...state, bvnVerified: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
}


const completeSetup = dispatch => async(userId, updateData) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    await gypsy.patch(`/client_details/${userId}`, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {  
    dispatch({
      type: "set_error",
      payload: err.message
    });
    dispatch({ type: "set_loading", payload: false });
  }
}


const verifyBvn = dispatch => async(userId, bvn, callback) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/verify_bvn/${userId}/${bvn}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({
      type: "verify_bvn",
      payload: true
    })
    if(callback) {
      callback();
    }
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      dispatch({
        type: 'set_error',
        payload: err.response.data.message
      })
    }
    dispatch({ type: "set_loading", payload: false })
  }
}

const clearErrors = dispatch => () => {
  dispatch({
    type: 'set_error',
    payload: null
  })
}

export const { Context, Provider } = createDataContext(
  userReducer,
  { completeSetup, verifyBvn, clearErrors },
  { loading: false, error: null, bvnVerified: false }
)