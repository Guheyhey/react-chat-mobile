import axios from 'axios';

// action type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_LOG = 'ERROR_LOG';

const initState = {
  msg: '',
  isAuth: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload}
    case ERROR_LOG:
      return {...state, isAuth: false, msg:action.msg}
    default:
      return state;
  }
}

// action creator
function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg) {
  return { type: ERROR_LOG, msg: msg};
}

function loginSuccess(data) {
  return {type: LOGIN_SUCESS, payload: data}
}

export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('Must enter username and password');
  }
  if (pwd !== repeatpwd) {
    return errorMsg('Password not match')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerSuccess({user, pwd, type}));
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }

}
