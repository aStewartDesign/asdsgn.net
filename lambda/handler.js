import hb from 'handlebars';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Hello from '../client/js/Components/Hello.jsx';
import index from '../client/index.hbs';

export const render = (event, context, callback) => {
    const ct = hb.compile(index);
    const params = event.queryStringParameters || {};
    const state = {
        name: params.name || 'World',
        adj: params.adj || 'beautiful'
    };
    const data = {
        data: JSON.stringify(state),
        content: renderToString(<Hello name={state.name} adj={state.adj} />),
        title: 'Hello world!',
        stylesheets: [
            'https://cdn.rawgit.com/tonsky/FiraCode/1.205/distr/fira_code.css',
            'https://s3-us-west-2.amazonaws.com/asdsgn.net/app.css'
        ],
        scripts: [
            'https://s3-us-west-2.amazonaws.com/asdsgn.net/client.js'
        ]
    };
    callback(null, {
        statusCode: 200,
        body: ct(data),
        headers: {
            'content-type': 'text/html'
        }
    });
};
