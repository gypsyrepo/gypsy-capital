import createDataContext from './createDataContext';
import gypsy from  '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
import history from '../utils/history';
import pageUrl from '../routes/pageUrl';


const authReducer = (state, action) => {
  switch(action.type) {
    case "loading_state":
      return { ...state, loading: action.payload }
    case "signin":
      return { ...state, token: action.payload, loggedIn: true }
    case "set_user":
      return { ...state, user: action.payload }
    case "set_message":
      return { ...state, message: action.payload}
    case "sign_out":
      return { ...state, user: null, loggedIn: false, token: null }
    case "set_error":
      return { ...state, error: action.payload }
    default:
      return state; 
  }
}


const registerUser = (dispatch) => async(data, callback) => {
  dispatch({ type: "loading_state", payload: true });
  dispatch({ type: 'set_error', payload: null });
  try {
    const response = await gypsy.post('/client/signup', data);
    console.log(response.data);
    const token = response.data.token;
    dispatch({
      type: 'signin',
      payload: token
    });
    if(callback) {
      callback(token);
    }
    dispatch({ type: "loading_state", payload: false });
    history.push(pageUrl.VERIFY_OTP_PAGE);
  } catch(err) {
    console.log(err)
    dispatch({
      type: 'set_error',
      payload: 'err.message'
    })
    dispatch({ type: "loading_state", payload: false });
  }
}

const loginUser = (dispatch) => async({email, password}, callback) => {
  dispatch({ type: "loading_state", payload: true });
  try {
    const response = await gypsy.post('/client/signin', { email, password });
    const token = response.data.token;
    dispatch({
      type: 'signin',
      payload: token
    });
    if(callback) {
      callback(token)
    }
    dispatch({ type: "loading_state", payload: false });
    history.push(pageUrl.DASHBOARD_HOMEPAGE);
  } catch(err) {
    console.log(err)
    dispatch({
      type: 'set_error',
      payload: 'err.message'
    })
    dispatch({ type: "loading_state", payload: false });
  }
}

const verifyOtp = (dispatch) => async(otp, phoneNo, callback) => {
  dispatch({ type: 'set_error', payload: null })
  dispatch({ type: "loading_state", payload: true})
  const token = resolveToken();
  try {
    await gypsy.post(`/otp/verify/${phoneNo}`, {inputOtp: otp}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if(callback) {
      callback();
    }
    dispatch({ type: "loading_state", payload: false })
    history.push(pageUrl.PROFILE_PAGE);
  } catch(err) {
    dispatch({
      type: 'set_error',
      payload: 'err.message'
    })
    dispatch({ type: "loading_state", payload: false })
  }
}

const resendOtp = (dispatch) => async(phoneNo) => {
  dispatch({ type: 'set_error', payload: null })
  dispatch({ type: "loading_state", payload: true})
  const token = resolveToken();
  try {
    const response = await gypsy.get(`/otp/${phoneNo}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: "loading_state", payload: false})
    dispatch({
      type: 'set_message',
      payload: response.data.message
    })
  } catch(err) {
    dispatch({
      type: 'set_error',
      payload: 'err.message'
    })
    dispatch({ type: "loading_state", payload: false })
  }
}

const getActiveUser = (dispatch) => async(token) => {
  console.log(token);
  try{
    const response = await gypsy.get('/client', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch({
      type: "set_user",
      payload: response.data.user
    })
  } catch(err) {
    dispatch({
      type: "set_error",
      payload: err.message
    })
  }
}


const logout = dispatch => () => {
  localStorage.removeItem('gypsy');
  dispatch({
    type: 'sign_out',
  })
  history.push(pageUrl.SIGNIN_PAGE);
}

const saveUserState = (state) => {
  const { user, token, loggedIn } = state;
  const userData = { user, token, loggedIn }
  localStorage.setItem('gypsy', JSON.stringify(userData))
}

export const { Context, Provider } = createDataContext(
  authReducer,
  { loginUser, registerUser, getActiveUser, verifyOtp, resendOtp, logout },
  { user: null, token: null, loggedIn: false, loading: false, error: null, message: null },
  true,
  saveUserState
)