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
    case 'set_user_details':
      return { ...state, userDetails: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  }
}


const completeSetup = dispatch => async(userId, updateData, callback) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.patch(`/client_details/${userId}`, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    if(callback) {
      callback();
    }
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {  
    console.log(err.response);
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
      if(err.response.data.error){
        if(err.response.data.error.includes('duplicate key')) {
          dispatch({
            type: 'set_error',
            payload: "This BVN already exists in our system"
          })
        }
      } else {
        dispatch({
          type: 'set_error',
          payload: err.response.data.message
        })
      }
    }
    dispatch({ type: "set_loading", payload: false })
  }
}

const getClientDetails = dispatch => async(userId) => {
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/client/details/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data.data)
    dispatch({ type: 'set_user_details', payload: response.data.data });
    console.log(response.data);
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      const { error } = err.response.data
      console.log(error)
      // if()
      dispatch({
        type: 'set_error',
        payload: err.response.error
      })
    }
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
  { completeSetup, verifyBvn, clearErrors, getClientDetails },
  { loading: false, error: null, bvnVerified: false, userDetails: null }
)