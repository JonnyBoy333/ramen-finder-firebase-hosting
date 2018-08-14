import * as firebase from 'firebase';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import IStoreState from '../store/IStoreState';
import withAuthorization from './Authentication/withAuthorization';
import Ramen from './Ramen';
// import PasswordChangeForm from './PasswordChange';
// import { PasswordForgetForm } from './PasswordForget';

interface IHomePageProps {
  authUser: firebase.User
}

const Home = () =>
    <Ramen />

const mapStateToProps = (state: IStoreState) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser: firebase.User) => !!authUser;

export default compose<IHomePageProps, {}>(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Home);