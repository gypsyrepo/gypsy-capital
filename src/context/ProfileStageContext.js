import createPersistDataContext from './createPersistDataContext';


const profileStageReducer = (state, action) => {
  switch(action.type) {
    case 'increase_stage':
      return { ...state, profileStage: action.payload }
    case 'set_data':
      return { ...state, userVerifyData: action.payload }
    default:
      return state
  }
}


const incrementStage = dispatch => (stage) => {
  dispatch({
    type: 'increase_stage',
    payload: stage
  })
}


const setVerifyData = dispatch => (data) => {
  dispatch({
    type: 'set_data',
    payload: data
  })
}


const saveSetupStage = (state) => {
  const { profileStage, userVerifyData } = state;
  const uiData = { profileStage, userVerifyData }
  sessionStorage.setItem('gypsyUI', JSON.stringify(uiData))
}


export const { Context, Provider } = createPersistDataContext(
  profileStageReducer,
  { incrementStage, setVerifyData },
  { profileStage: 0, userVerifyData: null },
  true,
  saveSetupStage,
  'session'
)