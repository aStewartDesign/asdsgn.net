import hb from 'handlebars';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Hello from './Components/Hello.jsx';
import index from './index.hbs';
import _ from 'lodash';

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
        title: 'Hello world!'
    };
    callback(null, {
        body: ct(data),
        headers: {
            'content-type': 'text/html'
        }
    });
};
