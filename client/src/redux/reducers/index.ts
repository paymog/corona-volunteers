import {LOGOUT, LOGIN, ActionType} from "../actionTypes";

const initialState = {
  token: ''
};

function rootReducer(state = initialState, action: ActionType) {
  console.log('root reducer called');
  if (action.type === LOGIN) {
    let assign = Object.assign({}, state, {token: action.payload.token});
    return assign
  }
  if (action.type === LOGOUT) {
    return Object.assign({}, state, {token: ''})
  }
  return state;
}

export default rootReducer;
