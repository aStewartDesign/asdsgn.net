import React from 'react';
import Link from 'react-router-dom/Link';
import {signInUser} from '../aws/aws-cognito.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        const {email, password} = this.state;
        return (
            <div>
                <h2>Admin Login</h2>
                <div style={{textAlign: 'left', maxWidth: '500px;', margin: '0 auto'}}>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={this.handleEmailChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={this.handlePasswordChange} />
                    </div>
                    <div>
                        <button onClick={this.handleLogin}>Go!</button>
                        <Link to="/password-reset">reset password</Link>
                    </div>
                </div>
            </div>
        );
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleLogin() {
        signInUser({
            email: this.state.email,
            password: this.state.password
        }).then((userObj) => {
            localStorage.setItem('user_email', this.state.email);
            this.setState({
                password: '',
                isLoggedIn: true
            });
        })
        .catch((err) => {
            console.log('Login failed. womp womp...');
            console.log(err);
            this.setState({
                password: ''
            });
        });
    }
}
