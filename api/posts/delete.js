'use strict';

const _ = require('lodash');
const dynamodb = require('../dynamodb.js');
const log = require('../log.js');
const baseResponse = require('../base-response.js');

module.exports = (event, ctx, cb) => {
    const response = _.assign({}, baseResponse);
    const body = {
        success: true
    };
    const params = {
        TableName: process.env.DYNAMODB_POSTS_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };

    dynamodb.delete(params, (err) => {
        if (err) {
            log(err);
            response.statusCode = err.statusCode || 501;
            body.success = false;
            body.message = `Couldn\'t remove the post ${params.Key.id}`;
            cb(null, response);
            return;
        }

        response.body = JSON.stringify(body);
        cb(null, response);
    });
};
