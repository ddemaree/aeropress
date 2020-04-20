import { createContext, useState, useReducer } from 'react';
import ms from 'ms'

const AUTH_EXPIRES_AT = 'ap_auth_expires_at';
const AUTH_USER = 'ap_auth_user';
const AUTH_TOKEN = 'ap_auth_token';

export const AUTH_START = 'START_AUTH'
export const AUTH_STOP = 'END_AUTH'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

const authReducer = (state, action) => {

  switch(action.type) {
    case AUTH_START:
      return {
        ...state,
        isAuthenticating: true
      }
    case AUTH_STOP:
      return {
        ...state,
        isAuthenticating: false
      }
    case AUTH_LOGOUT:
      if(typeof localStorage !== "undefined") {
        localStorage.removeItem(AUTH_EXPIRES_AT)
        localStorage.removeItem(AUTH_USER)
        localStorage.removeItem(AUTH_TOKEN)
      }
      
      return {
        ...state,
        user: {},
        expiresAt: null
      }
    case AUTH_LOGIN:
      const { authToken, user } = action;

      const expiresAt = ms("1 week") + new Date().getTime();

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(AUTH_EXPIRES_AT, JSON.stringify(expiresAt))
        localStorage.setItem(AUTH_TOKEN, JSON.stringify(authToken))
        localStorage.setItem(AUTH_USER, JSON.stringify(user))
      }
      
      return {
        ...state,
        authToken,
        user,
        expiresAt
      };
    default:
      return state;
  }
}

export const loginUser = (authToken = null, user = {}) => {
  return {
    type: AUTH_LOGIN,
    user,
    authToken
  }
}

const getDefaultState = () => {
  const DEFAULT_STATE = {
    user: {},
    authToken: null,
    expiresAt: null,
    isAuthenticating: false
  };
  
  let storedState = {};
  
  if (typeof localstorage !== 'undefined') {
    const expiresAt = new Date(
      JSON.parse(localStorage.getItem(AUTH_EXPIRES_AT) || "0")
    )
    
    if(expiresAt > new Date()) {
      storedState = {
        user: JSON.parse(localStorage.getItem(AUTH_USER) || "{}"),
        authToken: (localStorage.getItem(AUTH_TOKEN) || ""),
        expiresAt
      }
    }
  }
  
  return {
    ...DEFAULT_STATE,
    ...storedState
  }
};

export const AuthContext = createContext({
  state: getDefaultState(),
  dispatch: () => {}
});

export const AuthProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(authReducer, getDefaultState())
  const [ contextValue, setContextValue ] = useState({
    state,
    dispatch
  })
  
  return <AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>
}