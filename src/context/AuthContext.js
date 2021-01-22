import createDataContext from './createDataContext';


const authReducer = (state, action) => {
  switch(action.type) {
    default:
      return state; 
  }
}


const login = (dispatch) => () => {

}


export const { Context, Provider } = createDataContext(
  authReducer,
  { login },
  { user: null, token: null, loggedIn: false }
)