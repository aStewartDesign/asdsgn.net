'use strict';

const uuid = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const dynamodb = require('../dynamodb.js');
const baseResponse = require('../base-response.js');

const log = require('../log.js');

module.exports = (event, ctx, cb) => {
    const timestamp = moment().format();
    const response = _.assign({}, baseResponse);
    const data = JSON.parse(event.body);
    if (typeof data.body !== 'string') {
        log('Validation failed');
        response.statusCode = 400;
        response.body = 'Couldn\'t create the post item.';
        cb(null, response);
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_POSTS_TABLE,
        Item: {
            id: uuid.v1(),
            body: data.body,
            title: data.title || '',
            created: timestamp,
            updated: timestamp
        }
    };

    dynamodb.put(params, (err) => {
        if (err) {
            log(err);
            response.body = 'Couldn\'t create the post item.';
            response.statusCode = err.statusCode || 501;
            cb(null, response);
            return;
        }

        response.body = JSON.stringify(params.Item);
        cb(null, response);
    });
};
