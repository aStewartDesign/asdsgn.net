import React from 'react';
import {forgotPassword} from '../aws/aws-cognito.js';

export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            pin: '',
            cognitoUserPackage: null,
            errorMessage: null,
            isLoading: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handlePinChange = this.handlePinChange.bind(this);
        this.handleSendVerification = this.handleSendVerification.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    render() {
        const {email, password, confirm_password, pin, cognitoUserPackage, errorMessage, isLoading} = this.state;

        return (
            <div className="container">
                <h2>Reset Password</h2>
                <form style={{textAlign: 'left'}}>
                    {
                        cognitoUserPackage
                            ? (
                                <div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={email} onChange={this.handleEmailChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="pin">Verification PIN</label>
                                        <input type="text" id="pin" value={pin} onChange={this.handlePinChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">New Password</label>
                                        <input type="password" id="password" value={password} onChange={this.handlePasswordChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="confPassword">Confirm New Password</label>
                                        <input type="password" id="confPassword" value={confirm_password} onChange={this.handleConfirmChange} />
                                    </div>
                                    <button onClick={this.handleReset}>Change Password</button>
                                </div>
                            )
                            : (
                                <div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={email} onChange={this.handleEmailChange} />
                                    </div>
                                    {
                                        isLoading
                                            ? 'Loading...'
                                            : (
                                                <button onClick={this.handleSendVerification}>Get Verification PIN</button>
                                            )
                                    }
                                </div>
                            )
                    }
                    {
                        errorMessage && (
                            <div>
                                <h3>Something's wrong:</h3>
                                {errorMessage}
                            </div>
                        )
                    }
                </form>
            </div>
        );
    }

    handleConfirmChange(e) {
        this.setState({confirm_password: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handlePinChange(e) {
        this.setState({pin: e.target.value});
    }

    handleSendVerification() {
        this.setState({
            isLoading: true
        });
        forgotPassword(this.state.email)
            .then((cognitoUserPackage) => {
                this.setState({
                    cognitoUserPackage,
                    isLoading: false
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: err.message,
                    isLoading: false
                });
            });
    }

    handleReset() {
        const {password, confirm_password, cognitoUserPackage, pin} = this.state;
        if (password === confirm_password) {
            cognitoUserPackage.cognitoUser.confirmPassword(pin, password, cognitoUserPackage.thirdArg);
        }
    }
}
