import * as firebase from 'firebase';
import { Dispatch } from 'redux';
import { auth } from '../firebase';
import IStoreState from '../store/IStoreState';
import { ActionTypeKeys as keys } from './ActionTypeKeys';
import { ActionTypes, IAuthSuccessAction, ILogoutAction } from './ActionTypes';

export function authSetUserAsync(authUser: firebase.User): (dispatch: Dispatch<ActionTypes>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IAuthSuccessAction>, getState: () => IStoreState) => {
    // setTimeout(() => {
    //   dispatch(authSetUser(authUser))
    // }, 3000);
    dispatch(authSetUser(authUser))
  }
}

export function logOutAsyn(): (dispatch: Dispatch<ActionTypes>) => Promise<void> {
  return async (dispatch: Dispatch<ILogoutAction>) => {
    try {
      await auth.doSignOut()
      dispatch(logOut())
    } catch (err) {
      console.log('Error logging out', err);
    }
  }
}

export function authSetUser(authUser: firebase.User): IAuthSuccessAction {
  return {
    authUser,
    type: keys.AUTH_USER_SET,
  }
}

export function logOut(): ILogoutAction {
  return {
    type: keys.LOG_OUT
  }
}