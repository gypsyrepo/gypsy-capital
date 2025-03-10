import createPersistDataContext from "./createPersistDataContext";
import gypsy from "../api/gypsy-web";
import resolveToken from "../utils/resolveToken";
import history from "../utils/history";
import pageUrl from "../routes/pageUrl";

const authReducer = (state, action) => {
  switch (action.type) {
    case "loading_state":
      return { ...state, loading: action.payload };
    case "signin":
      return { ...state, token: action.payload, loggedIn: true };
    case "set_user":
      return { ...state, user: action.payload };
    case "set_message":
      return { ...state, message: action.payload };
    case "sign_out":
      return { ...state, user: null, loggedIn: false, token: null };
    case "set_register_status":
      return { ...state, registerStatus: action.payload };
    case "set_current_added_user":
      return { ...state, currentAddedUser: action.payload };
    case "set_redirect_inactive_user":
      return { ...state, redirectInactiveUser: action.payload };
    case "set_error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const registerUser = (dispatch) => async (data, callback) => {
  dispatch({ type: "loading_state", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const response = await gypsy.post("/client/signup", data);
    console.log(response.data);
    const token = response.data.token;
    dispatch({
      type: "signin",
      payload: token,
    });
    if (callback) {
      callback(token);
    }
    dispatch({ type: "loading_state", payload: false });
    history.push(pageUrl.VERIFY_OTP_PAGE);
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.log(err.response);
      if (err.response.data.message) {
        dispatch({
          type: "set_error",
          payload: err.response.data.message,
        });
      } else if (err.response.data.error) {
        const errorMessage = err.response.data.error;
        dispatch({ type: "set_error", payload: errorMessage });
        if (errorMessage.includes("duplicate key")) {
          if (errorMessage.includes("phoneNumber")) {
            dispatch({
              type: "set_error",
              payload: "This Phone Number already exist",
            });
          }
          if (errorMessage.includes("email")) {
            dispatch({
              type: "set_error",
              payload: "This Email already exist",
            });
          }
        }
      }
    }
    dispatch({ type: "loading_state", payload: false });
  }
};

const addStaff = (dispatch) => async (data) => {
  dispatch({ type: "loading_state", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post("/client/signup", data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch({ type: "loading_state", payload: false });
    console.log(response);
  } catch(err) {
    dispatch({ type: "loading_state", payload: false });
    if (err.response) {
      console.log(err.response);
      const errorMessage = err.response.data.error || err.response.data.message;
      console.log(errorMessage)
      dispatch({
        type: "set_error",
        payload: errorMessage
      })
    }
  }
}

const addUserByAgent = (dispatch) => async (data, callback) => {
  dispatch({ type: "loading_state", payload: true });
  dispatch({ type: "set_error", payload: null });
  try {
    const token = resolveToken();
    const response = await gypsy.post("/client/signup", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newUserToken = response.data.token;
    // console.log(response.data.token);
    if (callback) {
      callback(newUserToken);
    }
    dispatch({ type: "set_register_status", payload: "unverified" });
    dispatch({ type: "loading_state", payload: false });
  } catch (err) {
    if (err.response) {
      console.log(err.response);
      if (err.response.data.message) {
        dispatch({
          type: "set_error",
          payload: err.response.data.message,
        });
      } else if (err.response.data.error) {
        const errorMessage = err.response.data.error;
        dispatch({ type: "set_error", payload: errorMessage });
        if (errorMessage.includes("duplicate key")) {
          if (errorMessage.includes("phoneNumber")) {
            dispatch({
              type: "set_error",
              payload: "This Phone Number already exist",
            });
          }
          if (errorMessage.includes("email")) {
            dispatch({
              type: "set_error",
              payload: "This Email already exist",
            });
          }
        }
      }
    }
    dispatch({ type: "loading_state", payload: false });
  }
};

const loginUser = (dispatch) => async ({ email, password }, callback) => {
  console.log('works')
  dispatch({ type: "set_error", payload: null });
  dispatch({ type: "loading_state", payload: true });
  try {
    const response = await gypsy.post("/client/signin", { email, password });
    const token = response.data.token;
    dispatch({
      type: "signin",
      payload: token,
    });
    if (callback) {
      callback(token);
    }
    dispatch({ type: "loading_state", payload: false });
  } catch (err) {
    if (err.response) {
      console.log(err.response);
      const errorMessage = err.response.data.error || err.response.data.message;
      if(errorMessage === "Verify your email or phone to activate account") {
        console.log('works')
        dispatch({
          type: "set_redirect_inactive_user",
          payload: true
        });
      } else {
        dispatch({
          type: "set_error",
          payload: errorMessage,
        });
      }
    }
    dispatch({ type: "loading_state", payload: false });
  }
};

const verifyOtp = (dispatch) => async (otp, email, callback, inModal) => {
  dispatch({ type: "set_error", payload: null });
  dispatch({ type: "loading_state", payload: true });
  const token = resolveToken();
  console.log(token);
  try {
    await gypsy.post(
      `/otp/3/verify/${email}`,
      { code: otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (callback) {
      callback();
    }
    dispatch({ type: "loading_state", payload: false });
    if (!inModal) {
      history.push(pageUrl.PROFILE_PAGE);
    } else {
      dispatch({ type: "set_register_status", payload: "verified" });
    }
  } catch (err) {
    if (err.response) {
      // console.log(err.response.data);
      dispatch({
        type: "set_error",
        payload: err.response.data.error,
      });
    }
    dispatch({ type: "loading_state", payload: false });
  }
};

const resendOtp = (dispatch) => async (email) => {
  dispatch({ type: "set_error", payload: null });
  dispatch({ type: "loading_state", payload: true });
  const token = resolveToken();
  try {
    const response = await gypsy.get(`/otp/3/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "loading_state", payload: false });
    dispatch({
      type: "set_message",
      payload: response.data.message,
    });
  } catch (err) {
    dispatch({
      type: "set_error",
      payload: "err.message",
    });
    dispatch({ type: "loading_state", payload: false });
  }
};

const getActiveUser = (dispatch) => async (token) => {
  try {
    let response;
    if (token) {
      response = await gypsy.get("/user/unbox", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      const token = resolveToken();
      response = await gypsy.get("/user/unbox", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    console.log(response.data);
    dispatch({
      type: "set_user",
      payload: response.data.user,
    });
  } catch (err) {
    if (err.response) {
      // console.log(err.response.data.message);
      dispatch({
        type: "set_error",
        payload: err.response.data.message,
      });
    }
  }
};

const getCurrentlyAddedUser = (dispatch) => async (token) => {
  try {
    const response = await gypsy.get("/user/unbox", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "set_current_added_user", payload: response.data.user });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      const errorMessage = err.response.data.error || err.response.data.message;
      dispatch({
        type: "set_error",
        payload: errorMessage,
      });
    }
  }
};

const clearErrors = (dispatch) => () => {
  dispatch({
    type: "set_error",
    payload: null,
  });
};

const clearMessage = (dispatch) => () => {
  dispatch({
    type: "set_message",
    payload: null,
  });
};

const resetInactiveUserStatus = (dispatch) => () => {
  dispatch({
    type: "set_redirect_inactive_user",
    payload: false
  });
};

const logout = (dispatch) => () => {
  Object.keys(sessionStorage)
    .filter((val) => {
      return /gypsy-/.test(val);
    })
    .forEach((session) => {
      sessionStorage.removeItem(session);
    });
  localStorage.removeItem("gypsy");
  sessionStorage.removeItem("gypsyUI");
  dispatch({
    type: "sign_out",
  });
  history.push(pageUrl.SIGNIN_PAGE);
};

const saveUserState = (state) => {
  const { user, token, loggedIn } = state;
  const userData = { user, token, loggedIn };
  localStorage.setItem("gypsy", JSON.stringify(userData));
};

export const { Context, Provider } = createPersistDataContext(
  authReducer,
  {
    loginUser,
    registerUser,
    getActiveUser,
    verifyOtp,
    resendOtp,
    logout,
    clearErrors,
    getCurrentlyAddedUser,
    addUserByAgent,
    resetInactiveUserStatus,
    clearMessage,
    addStaff
  },
  {
    user: null,
    token: null,
    loggedIn: false,
    loading: false,
    error: null,
    message: null,
    registerStatus: null,
    currentAddedUser: null,
    redirectInactiveUser: false
  },
  true,
  saveUserState,
  "local"
);
