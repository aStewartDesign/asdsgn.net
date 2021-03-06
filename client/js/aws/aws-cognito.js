import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials} from 'amazon-cognito-identity-js';
import {userPool, USERPOOL_ID, IDENTITY_POOL_ID} from './aws-profile.js';
import _ from 'lodash';
import uuid from 'uuid';
import 'amazon-cognito-js';
import AWS from 'aws-sdk';

const landlordAttrs = ['email', 'id'];
// const landlordAttrs = ['email', 'customFieldName', 'id'];
// const attrs = ['custom:customFieldName'];

export function signUpUser({email, password}) {
    return new Promise((res, rej) => {
        const attributeList = [];
        attributeList.push(new CognitoUserAttribute({
            Name: 'email',
            Value: email
        }));
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                rej(err);
            }

            res({email});
        });
    });
}

export function signInUser({email, password}) {
    return new Promise((res, rej) => {
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });
        authenticateUser(cognitoUser, authDetails)
            .then((resp) => {
                const userProfile = buildUserObject(cognitoUser);
                res(_.assign(userProfile, {
                    type: resp.type
                }));;
            })
            .catch((err) => {
                rej(err);
            });
    });
}

export function completeNewPasswordChallenge({cognitoUser, password}) {
    return new Promise((res, rej) => {
        cognitoUser.completeNewPasswordChallenge(password, null, {
            onSuccess: (resp) => {
                localStorage.setItem('user_token', resp.accessToken.jwtToken);
                const Logins = {
                    [USERPOOL_ID]: resp.getIdToken().getJwtToken()
                };
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    Logins
                });
                AWS.config.credentials.refresh(() => {
                    console.log('AWS Credentials refreshed!');
                });
                res(_.assign({
                    type: 'success'
                }, buildUserObject(cognitoUser)));
            },
            onFailure: (err) => {
                console.log(err);
                rej(err);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                console.log('User needs a new password.');
                res({
                    type: 'new-password',
                    requiredAttributes,
                    userAttributes,
                    cognitoUser
                });
            }
        });
    });
}

function authenticateUser(cognitoUser, authDetails) {
    return new Promise((res, rej) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (resp) => {
                localStorage.setItem('user_token', resp.accessToken.jwtToken);
                const Logins = {
                    [USERPOOL_ID]: resp.getIdToken().getJwtToken()
                };
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    Logins
                });
                AWS.config.credentials.refresh(() => {
                    console.log('AWS Credentials refreshed!');
                });
                res({
                    type: 'success'
                });
            },
            onFailure: (err) => {
                console.log(err);
                rej(err);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                console.log('User needs a new password.');
                rej({
                    type: 'new-password',
                    cognitoUser
                });
            }
        });
    });
}

function buildUserObject(cognitoUser) {
    return new Promise((res, rej) => {
        cognitoUser.getUserAttributes((err, result) => {
            if (err) {
                console.log(err);
                rej(err);
            }
            const userProfileObj = {};
            result.forEach((attr) => {
                const custom = 'custom:';
                if (attr.getName().indexOf(custom) >= 0) {
                    const name = attr.getName().substring(custom.length);
                    userProfileObj[name] = attr.getValue();
                }
                else {
                    userProfileObj[attr.getName()] = attr.getValue();
                }
            });
            res(userProfileObj);
        });
    });
}

export function verifyUserAccount({email, pin}) {
    return new Promise((res, rej) => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });
        cognitoUser.confirmRegistration(pin, true, (err, result) => {
            if (err) {
                console.log(err);
                rej(err);
                return;
            }

            if (result === 'SUCCESS') {
                console.log('Account verified!');
                cognitoUser.signOut();
                res();
            }
            else {
                rej('Could not verify account.');
            }
        });
    });
}

export function forgotPassword(email) {
    return new Promise((res, rej) => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });
        cognitoUser.forgotPassword({
            onSuccess: (result) => {
                console.log('forgotPassword:onSuccess!');
            },
            onFailure: (err) => {
                rej(err);
            },
            inputVerificationCode: function(data) {
                console.log('forgotPassword:inputVerificationCode!');
                res({
                    cognitoUser,
                    thirdArg: this
                });
            }
        });
    });
}

export function resetVerificationPIN(email) {
    return new Promise((res, rej) => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });
        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                console.log(err);
                rej(err);
            }
            else {
                res();
            }
        });
    });
}

export function signOutUser() {
    return new Promise((res, rej) => {
        const cognitoUser = userPool.getCurrentUser();
        cognitoUser.signOut();
    });
}
