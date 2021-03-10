import createDataContext from './createDataContext'
import gypsy from '../api/gypsy-web';
import resolveToken from '../utils/resolveToken';


const bankReducer = (state, action) => {
  switch(action.type) {
    case 'set_bank_list':
      return { ...state, bankList: action.payload }
    case 'set_error':
      return { ...state, error: action.payload }
    case 'set_loading':
      return { ...state, bankLoading: action.payload }
    case 'set_user_bank_details':
      return { ...state, userBankDetails: action.payload }
    default:
      return state;
  }
}


const getBankList = dispatch => async() => {
  try {
    const token = resolveToken();
    const response = await gypsy.get('/bank/list/flutter', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    // console.log(response.data)
    dispatch({
      type: 'set_bank_list',
      payload: response.data.data
    });
  } catch(err) {
    if(err.response) {
      dispatch({
        type: 'set_error',
        payload: err.response.message
      });
    }
  }
}


const verifyBankInfo = dispatch => async(accountNo, bankCode) => {
  dispatch({ type: 'set_loading', payload: true });
  try {
    const token = resolveToken();
    const response = await gypsy.get(`/bank/verify/${accountNo}/${bankCode}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data)
    dispatch({
      type: 'set_user_bank_details',
      payload: response.data.data
    })
    dispatch({ type: 'set_loading', payload: false });
  } catch(err) {
    if(err.response) {
      console.log(err.response);
      dispatch({
        type: 'set_error',
        payload: err.response.message
      })
    }
    dispatch({ type: 'set_loading', payload: false });
  }
}


export const { Context, Provider } = createDataContext(
  bankReducer,
  { getBankList, verifyBankInfo },
  { bankList: [], error: null, userBankDetails: null, bankLoading: false }
)