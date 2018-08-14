import { History } from 'history';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';

import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { PasswordForgetLink } from './PasswordForget';
import { SignUpLink } from './SignUp';

const SignInPage = ({ history }: { history: History }) =>
  <div>
    <h1 className={'navigationHeader'}>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

interface IState {
  email: string;
  error: Error | null;
  password: string;
}

const INITIAL_STATE = {
  email: '',
  error: null,
  password: '',
};

class SignInForm extends React.Component<{ history: History }, IState> {
  constructor(props: { history: History }) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  public onSubmit = (event: React.FormEvent<EventTarget>) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch((error: Error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  public onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: event.currentTarget.value });
  public onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: event.currentTarget.value });

  public render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className='row' style={{ paddingTop: '20px' }}>
        <div className='col-lg-4 offset-lg-4'>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                autoFocus={true}
                type='email'
                value={email}
                onChange={this.onEmailChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                value={password}
                onChange={this.onPasswordChange}
                type='password'
              />
            </FormGroup>
            <Button
              block={true}
              disabled={isInvalid}
              type='submit'
            >
              Login
          </Button>
          </form>
          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};