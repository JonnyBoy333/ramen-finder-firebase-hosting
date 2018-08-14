import IStoreState from '../store/IStoreState';

const defaultState: IStoreState = {
  pendingActions: {
    fetchRamen: false
  },
  ramen: [],
  sessionState: {
    authUser: null
  }
}

export default defaultState;