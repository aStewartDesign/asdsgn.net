import React from 'react';
import Link from 'react-router-dom/Link';
import {signInUser, completeNewPasswordChallenge} from '../aws/aws-cognito.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            newPassword: '',
            isLoggedIn: false,
            isNewPassword: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleNewPasswordLogin = this.handleNewPasswordLogin.bind(this);
    }

    render() {
        const {email, password, newPassword, isNewPassword} = this.state;
        return (
            <div className="container">
                <div>
                    <h2>Admin Login</h2>
                    {
                        isNewPassword && (
                            <div>
                                Okay, I get it. You're special and need a new password. Go ahead...
                            </div>
                        )
                    }
                </div>
                <form style={{textAlign: 'left', maxWidth: '500px;', margin: '0 auto'}}>
                    {
                        !isNewPassword && (
                            <div>
                                <label>Email</label>
                                <input type="email" value={email} onChange={this.handleEmailChange} />
                            </div>
                        )
                    }
                    <div>
                        <label>{isNewPassword && 'New '}Password</label>
                        <input type="password" value={password} onChange={this.handlePasswordChange} />
                    </div>
                    {
                        isNewPassword &&
                            <div>
                                <label>Verify New Password</label>
                                <input type="password" value={newPassword} onChange={this.handleNewPasswordChange} />
                            </div>
                    }
                    <div>
                        <button
                            type="button"
                            onClick={(
                                isNewPassword
                                    ? this.handleNewPasswordLogin
                                    : this.handleLogin
                            )}>
                            Go!</button>
                        <Link to="/password-reset">reset password</Link>
                    </div>
                </form>
            </div>
        );
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleNewPasswordChange(e) {
        this.setState({newPassword: e.target.value});
    }

    handleLogin(e) {
        e.preventDefault();
        signInUser({
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            switch (res.type) {

                case 'new-password':
                    this.setState({
                        isNewPassword: true,
                        password: ''
                    });
                break;

                case 'success':
                    localStorage.setItem('user_email', this.state.email);
                    this.setState({
                        isLoggedIn: true,
                        password: ''
                    });
                break;

                default:
            }
        })
        .catch((err) => {
            console.log('Login failed. womp womp...');
            console.log(err);
            const state = {password: ''};
            if (err.type === 'new-password') {
                state.isNewPassword = true;
                state.cognitoUser = err.cognitoUser;
            }
            this.setState(state);
        });
    }

    handleNewPasswordLogin() {
        const {cognitoUser, password, newPassword} = this.state;
        if (newPassword === password) {
            completeNewPasswordChallenge({
                cognitoUser,
                password
            });
        }
    }
}
