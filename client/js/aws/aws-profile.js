import {CognitoUserPool} from 'amazon-cognito-identity-js';
import 'amazon-cognito-js';
import AWS from 'aws-sdk';

const REGION = 'us-west-2';
const USER_POOL_ID = 'us-west-2_jWDo5dbxA';
const CLIENT_ID = '3o0nju12b823a35ju0iog1e687';

AWS.config.update({
    region: REGION
});
const userData = {
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID
};

export const userPool = new CognitoUserPool(userData);
export const USERPOOL_ID = `cognito-ids.${REGION}.amazonaws.com/${USER_POOL_ID}`;
// export const IDENTITY_POOL_ID = '';
