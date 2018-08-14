import * as firebase from 'firebase';
import * as React from 'react';
import { connect } from 'react-redux';
import { authSetUserAsync } from '../../actions/authenticationAction';
import { firebase as fb } from '../../firebase';

interface IAuthenticationProps {
  onSetAuthUser: (authUser: firebase.User | null) => any
}

const withAuthentication = (Component: React.ComponentClass | React.StatelessComponent) => {
  class WithAuthentication extends React.Component<IAuthenticationProps> {

    public componentDidMount() {
      const { onSetAuthUser } = this.props;

      fb.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      })
    }

    public render() {
      return (
        <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch: any) => ({
    onSetAuthUser: (authUser: firebase.User) => dispatch(authSetUserAsync(authUser)),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;