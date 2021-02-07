import createPersistDataContext from './createPersistDataContext';
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
    // console.log(response.data);
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
    if(err.response) {
      console.log(err.response);
      if(err.response.data.message) {
        dispatch({
          type: 'set_error',
          payload: err.response.data.message
        })
      } else if(err.response.data.error) {
        const errorMessage = err.response.data.error;
        dispatch({ type: 'set_error', payload: errorMessage })
        if(errorMessage.includes('duplicate key')) {
          if(errorMessage.includes('phoneNumber')) {
            dispatch({ type: 'set_error', payload: "This Phone Number already exist"})
          }
          if(errorMessage.includes('email')) {
            dispatch({ type: 'set_error', payload: "This Email already exist"})
          }
        }
      }
    }
    dispatch({ type: "loading_state", payload: false });
  }
}

const loginUser = (dispatch) => async({email, password}, callback) => {
  dispatch({ type: 'set_error', payload: null })
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
    if(err.response) {
      // console.log(err.response.data.message);
      dispatch({
        type: 'set_error',
        payload: err.response.data.message
      })
    }
    dispatch({ type: "loading_state", payload: false });
  }
}

const verifyOtp = (dispatch) => async(otp, email, callback) => {
  dispatch({ type: 'set_error', payload: null })
  dispatch({ type: "loading_state", payload: true})
  const token = resolveToken();
  console.log(token)
  try {
    await gypsy.post(`/otp/3/verify/${email}`, {code: otp}, {
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
    if(err.response) {
      // console.log(err.response.data);
      dispatch({
        type: 'set_error',
        payload: err.response.data.error
      })
    }
    dispatch({ type: "loading_state", payload: false })
  }
}

const resendOtp = (dispatch) => async(email) => {
  dispatch({ type: 'set_error', payload: null })
  dispatch({ type: "loading_state", payload: true})
  const token = resolveToken();
  try {
    const response = await gypsy.get(`/otp/3/${email}`, {
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
    let response;
    if(token) {
      response = await gypsy.get('/user/unbox', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } else {
      const token = resolveToken();
      response = await gypsy.get('/user/unbox', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
    console.log(response.data);
    dispatch({
      type: "set_user",
      payload: response.data.user
    })
  } catch(err) {
    if(err.response) {
      // console.log(err.response.data.message);
      dispatch({
        type: 'set_error',
        payload: err.response.data.message
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


const logout = dispatch => () => {
  localStorage.removeItem('gypsy');
  sessionStorage.removeItem('gypsyUI')
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

export const { Context, Provider } = createPersistDataContext(
  authReducer,
  { loginUser, registerUser, getActiveUser, verifyOtp, resendOtp, logout, clearErrors },
  { user: null, token: null, loggedIn: false, loading: false, error: null, message: null },
  true,
  saveUserState,
  'local'
)