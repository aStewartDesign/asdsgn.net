'use strict';

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
        TableName: process.env.DYNAMODB_POSTS_TABLE
    };

    dynamodb.scan(params, (err, result) => {
        if (err) {
            log(err);
            body.message = 'Couldn\'t fetch the posts.';
            body.success = false;
            response.statusCode = err.statusCode || 501;
            response.body = JSON.stringify(body);
            cb(null, response);
            return;
        }
        
        body.data = result.Items;
        response.body = JSON.stringify(body);
        cb(null, response);
    });
};
