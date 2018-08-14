import { ActionTypeKeys as keys } from '../actions/ActionTypeKeys'
import { ActionTypes, IAuthSuccessAction } from '../actions/ActionTypes';
import IStoreState from '../store/IStoreState';
import initialState from './initialState';

const applySetAuthUser = (state: IStoreState['sessionState'], action: IAuthSuccessAction) => ({
  ...state,
  authUser: action.authUser
});

function sessionReducer(state = initialState.sessionState, action: ActionTypes) {
  switch(action.type) {
    case keys.AUTH_USER_SET : {
      return applySetAuthUser(state, action);
    }
    default : return state;
  }
}

export default sessionReducer;