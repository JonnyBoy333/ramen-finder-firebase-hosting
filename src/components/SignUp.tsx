import { History } from 'history';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import * as routes from '../constants/routes';
import { auth, db } from '../firebase';

const SignUpPage = ({ history }: { history: History }) =>
  <div>
    <h1 className={'navigationHeader'}>Sign Up</h1>
    <SignUpForm history={history} />
  </div>

interface IState {
  email: string;
  error: Error | null;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}

const INITIAL_STATE = {
  email: '',
  error: null,
  passwordOne: '',
  passwordTwo: '',
  username: '',
};

// const byPropKey = (propertyName, value) => () => ({
//   [propertyName]: value,
// });

class SignUpForm extends React.Component<{ history: History }, IState> {
  constructor(props: { history: History }) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  public onSubmit = (event: React.FormEvent<EventTarget>) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: firebase.auth.UserCredential) => {

        // Create a user in your own accessible Firebase Database too
        if (authUser.user) {
          db.doCreateUser(authUser.user.uid, username, email)
            .then(() => {
              this.setState({ ...INITIAL_STATE });
              history.push(routes.HOME);
            })
            .catch((error: Error) => {
              this.setState({ error });
            });
        }

      })
      .catch((error: Error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  public onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: event.target.value });
  public onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: event.currentTarget.value });
  public onPasswordOneChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ passwordOne: event.target.value });
  public onPasswordTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ passwordTwo: event.target.value });

  public render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className='row' style={{ paddingTop: '20px' }}>
        <div className='col-lg-4 offset-lg-4'>
          <form onSubmit={this.onSubmit}>
            <FormGroup style={{ textAlign: 'left' }}>
              <Label>Username</Label>
              <Input
                autoFocus={true}
                value={username}
                onChange={this.onUsernameChange}
                type='text'
                placeholder='Full Name'
              />
            </FormGroup>
            <FormGroup style={{ textAlign: 'left' }}>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={this.onEmailChange}
                type='text'
                placeholder='Email Address'
              />
            </FormGroup>
            <FormGroup style={{ textAlign: 'left' }}>
              <Label>Password</Label>
              <Input
                value={passwordOne}
                onChange={this.onPasswordOneChange}
                type='password'
                placeholder='Password'
              />
            </FormGroup>
            <FormGroup style={{ textAlign: 'left' }}>
              <Label>Re-Enter Password</Label>
              <Input
                value={passwordTwo}
                onChange={this.onPasswordTwoChange}
                type='password'
                placeholder='Confirm Password'
              />
            </FormGroup>
            <Button
              block={true}
              disabled={isInvalid}
              type='submit'>
              Sign Up
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};