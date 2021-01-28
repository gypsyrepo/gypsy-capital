import createDataContext from './createDataContext';
import gypsy from  '../api/gypsy-web';
import history from '../utils/history';
import pageUrl from '../routes/pageUrl';


const authReducer = (state, action) => {
  switch(action.type) {
    case "loading_state":
      return { ...state, loading: action.payload }
    case "signup":
      return { ...state, token: action.payload, loggedIn: true }
    case "set_user":
      return { ...state, user: action.payload }
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
    localStorage.setItem('gypsyToken', token)
    dispatch({
      type: 'signup',
      payload: token
    });
    if(callback) {
      callback();
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
    localStorage.setItem('gypsyToken', token)
    dispatch({
      type: 'signin',
      payload: token
    });
    if(callback) {
      callback()
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

const verifyOtp = () => async() => {
  
}

const getActiveUser = (dispatch) => async() => {
  try{
    const token = localStorage.getItem('gypsyToken');
    const response = await gypsy.get('/client', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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


export const { Context, Provider } = createDataContext(
  authReducer,
  { loginUser, registerUser, getActiveUser },
  { user: null, token: null, loggedIn: false, loading: false, error: null }
)