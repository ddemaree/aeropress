import { createContext, useState, useReducer } from 'react';

const AUTH_EXPIRES_AT = 'ap_auth_expires_at';
const AUTH_USER = 'ap_auth_user';

const actions = {
  AUTH_START: 'START_AUTH',
  AUTH_END: 'END_AUTH',
  
}

const authReducer = (state, action) => {
  return state;
}

const getDefaultState = () => {
  const DEFAULT_STATE = {
    user: {},
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