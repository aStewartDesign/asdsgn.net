'use strict';
/*

TO BE IMPLEMENTED...

const _ = require('lodash');
const dynamodb = require('../dynamodb.js');
const baseResponse = require('../base-response.js');
const log = require('../log.js');

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

    dynamodb.get(params, (err, result) => {
        if (err) {
            log(err);
            body.message = 'Couldn\'t fetch the post.';
            body.success = false;
            response.statusCode = err.statusCode || 501;
            response.body = JSON.stringify(body);
            cb(null, response);
            return;
        }
        
        body.data = result.Item;
        response.body = JSON.stringify(body);
        cb(null, response);
    });
};
*/