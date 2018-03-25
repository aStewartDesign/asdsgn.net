'use strict';

const jwk = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const log = require('./log.js');

const userPoolId = 'us-west-2_jWDo5dbxA';
const region = 'us-west-2';
const iss = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
      const policyDocument = {};
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {};
      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
    }
    return authResponse;
  };

module.exports.authorize = (event, ctx, cb) => {
    log('Auth function invoked!');
    if (event.authorizationToken) {
        const token = event.authorizationToken.substring('bearer '.length);

        axios.get(`${iss}.well-known/jwks.json`, {
            headers: { 'Content-type': 'application/json' }
        }).then((res) => {
            if (res.statusCode !== 200) {
                log('Womp, womp! something went wrong...');
                log(res);
                cb('You shall not pass!');
                return;
            }

            const k = res.data.keys[0];
            const jwkArray = {
                kty: k.kty,
                n: k.n,
                e: k.e
            };
            const pem = jwkToPem(jwkArray);

            jwk.verify(token, pem, { issuer: iss }, (err, decoded) => {
                if (err) {
                    log('Unauthorized user: ', err.message);
                    cb('You shall not pass!');
                } else {
                    cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
                }
            });
        }).catch((err) => {
            log('Womp, womp! something went wrong...');
            log(err);
            cb('You shall not pass!');
        });
    }
};
