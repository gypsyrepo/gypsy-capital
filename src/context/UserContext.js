import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';


const userReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
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


export const { Context, Provider } = createDataContext(
  userReducer,
  completeSetup,
  { loading: false, error: null }
)