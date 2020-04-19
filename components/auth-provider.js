const AUTH_EXPIRES_AT = 'ap_auth_expires_at';
const AUTH_USER = 'ap_auth_user';

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
}