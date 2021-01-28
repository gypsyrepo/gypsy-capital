import createDataContext from './createDataContext';
import gypsy from  '../api/gypsy-web';


const authReducer = (state, action) => {
  switch(action.type) {
    default:
      return state; 
  }
}


const registerUser = (dispatch) => async(data) => {
  dispatch({ type: "loading_state", payload: true });
  try {
    const response = await gypsy.post('client/signup', data);
    console.log(response);
  } catch(err) {

  }
}

const loginUser = (dispatch) => async({email, password}) => {
  try {
    const response = await gypsy.post('client/signin', { email, password });
    console.log(response);
  } catch(err) {
    console.log(err);
  }
}


export const { Context, Provider } = createDataContext(
  authReducer,
  { loginUser, registerUser },
  { user: null, token: null, loggedIn: false, loading: false }
)