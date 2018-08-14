import * as firebase from 'firebase';
import { IRamen } from '../store/IStoreState';
import { ActionTypeKeys } from './ActionTypeKeys';

export interface IFetchRamenSuccessAction {
  readonly type: ActionTypeKeys.FETCH_RAMEN_SUCCESS;
  readonly payload: IRamen[];
}

export interface IFetchRamenInProgressAction {
  readonly type: ActionTypeKeys.FETCH_RAMEN_INPROGRESS
}

export interface IFetchRamenFailAction {
  readonly type: ActionTypeKeys.FETCH_RAMEN_FAIL;
  readonly payload: Error;
}

export interface IAuthSuccessAction {
  readonly type: ActionTypeKeys.AUTH_USER_SET;
  readonly authUser: firebase.User;
}

export interface ILogoutAction {
  readonly type: ActionTypeKeys.LOG_OUT;
}

type ActionTypes = IFetchRamenSuccessAction | IFetchRamenInProgressAction | IFetchRamenFailAction | IAuthSuccessAction | ILogoutAction;

export { ActionTypes };