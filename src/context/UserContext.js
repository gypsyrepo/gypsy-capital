import createDataContext from './createDataContext';
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';
import history from '../utils/history';
import _ from 'lodash';


const userReducer = (state, action) => {
  switch(action.type) {
    case 'set_loading':
      return { ...state, loading: action.payload }
    case 'set_updating':
      return { ...state, updating: action.payload }
    case 'set_user_details':
      return { ...state, userDetails: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    case 'set_setup_stage':
      return { ...state, setupStage: action.payload }
    case 'set_client_list':
      return { ...state, clients: action.payload }
    case 'set_details_status':
      return { ...state, detailStatus: action.payload }
    case 'set_clients_for_role':
      return { ...state, clientsForRole: action.payload }
    case 'set_message':
      return { ...state, message: action.payload }
    default:
      return state;
  }
}


const updatePersonalInfo = dispatch => async(userId, updateData, inModal) => {
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
    dispatch({
      type: 'set_setup_stage',
      payload: 'personal_info_added'
    })
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/profile/setup/identity');
    }
  } catch(err) {  
    console.log(err.response);
    if(err.response) {
      dispatch({
        type: "set_error",
        payload: err.response.message
      });
    }
    dispatch({ type: "set_loading", payload: false });
  }
}


const verifyBvn = dispatch => async(userId, bvn, callback, inModal) => {
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
      type: "set_setup_stage",
      payload: "bvn_verified"
    })
    if(callback) {
      callback();
    }
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/profile/setup/info')
    }
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


const verifyBvnAlt = dispatch => async(userId, verifyData, callback, inModal) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  console.log(verifyData);
  try {
    const token = resolveToken();
    await gypsy.post(`/verify_bvn_b/${userId}`, verifyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // console.log(response.data);

    dispatch({
      type: "set_setup_stage",
      payload: "bvn_verified"
    })
    if(callback) {
      callback();
    }
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/profile/setup/info')
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      dispatch({
        type: 'set_error',
        payload: err.response.data.message
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}


const updateIdentityInfo = dispatch => async(userId, updateData, inModal) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.patch(`/media/identity/${userId}`, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    dispatch({
      type: 'set_setup_stage',
      payload: 'identity_added'
    })
    dispatch({ type: "set_loading", payload: false });
    if(!inModal) {
      history.push('/dashboard/profile/setup/success');
    }
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      dispatch({
        type: 'set_error',
        payload: err.response.data.message
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}

const getClientDetails = dispatch => async(userId) => {
  dispatch({ type: 'set_loading', payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/client/details/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data.data)
    dispatch({ type: 'set_user_details', payload: response.data.data });
    dispatch({ type: 'set_loading', payload: false });
    // console.log(response.data);
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      const errorMessage = err.response.data.error || err.response.data.message
      if(errorMessage === "Client has not fully setup their account") {
        dispatch({ type: "set_user_details", payload: null });
      }
      dispatch({
        type: "set_error",
        payload: errorMessage
      });
      dispatch({ type: 'set_loading', payload: false });
    }
  }
}

const getClientList = dispatch => async() => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get('/clients', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data);
    dispatch({ type: "set_client_list", payload: response.data.users });
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_error',
        payload: errorMessage
      });
    }
    dispatch({ type: "set_loading", payload: false });
  }
}

const getClientListForRole = dispatch => async() => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get('/clients/list', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    // console.log(response.data.data);
    dispatch({ type: "set_clients_for_role", payload: _.reverse(response.data.data) });
    dispatch({ type: "set_loading", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message
      dispatch({
        type: 'set_error',
        payload: errorMessage
      });
      dispatch({ type: "set_loading", payload: false });
    }
  }
}

const resetPassword = dispatch => async(userEmail) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post('/client/reset_pwd', { email: userEmail }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: "set_loading", payload: false });
    history.push({ pathname: '/password/reset', state: { email: userEmail }});
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      const errorMessage = err.response.data.error || err.response.data.message
      console.log(errorMessage);
      dispatch({
        type: 'set_error',
        payload: errorMessage
      })
    }
    dispatch({ type: "set_loading", payload: false });
  }
}


const createNewPassword = dispatch => async(data) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_loading", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.post('/otp/3/new_pwd', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    dispatch({ type: "set_loading", payload: false });
    history.push('/password/reset-success');
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      const errorMessage = err.response.data.error || err.response.data.message
      console.log(errorMessage);
      dispatch({
        type: 'set_error',
        payload: errorMessage
      })
    }
    dispatch({ type: "set_loading", payload: false });
  }
}

const updateClientData = dispatch => async(clientId, newData) => {
  dispatch({ type: 'set_error', payload: null });
  dispatch({ type: "set_updating", payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.patch(`/client_details/${clientId}`, newData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data.message);

    dispatch({
      type: "set_message",
      payload: response.data.message
    });
    dispatch({ type: "set_updating", payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response)
      const errorMessage = err.response.data.error || err.response.data.message
      console.log(errorMessage);
      dispatch({
        type: 'set_error',
        payload: errorMessage
      })
    }
    dispatch({ type: "set_updating", payload: false });
  }
}

const clearMessage = dispatch => () => {
  dispatch({
    type: 'set_message',
    payload: null
  });
}

const clearErrors = dispatch => () => {
  dispatch({
    type: 'set_error',
    payload: null
  })
}

export const { Context, Provider } = createDataContext(
  userReducer,
  { updatePersonalInfo, verifyBvn, clearErrors, getClientDetails, updateIdentityInfo, resetPassword, createNewPassword, getClientList, getClientListForRole, verifyBvnAlt, updateClientData, clearMessage },
  { loading: false, error: null, userDetails: null, setupStage: null, clients: [], detailStatus: true, clientsForRole: [], message: null, updating: false }
)