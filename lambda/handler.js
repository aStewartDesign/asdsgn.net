import hb from 'handlebars';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {StaticRouter} from 'react-router-dom';
import {matchRoutes, renderRoutes} from 'react-router-config';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../client/js/routes.js';
import reducers from '../client/js/reducers/app.js';
import index from '../client/index.hbs';

const store = createStore(reducers, applyMiddleware(thunk));

export const render = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: '',
        headers: {
            'content-type': 'text/html'
        }
    };
    const ct = hb.compile(index);
    const params = event.queryStringParameters || {};
    const state = {
        name: params.name || 'World',
        adj: params.adj || 'beautiful'
    };
    const routerContext = {};
    const data = {
        data: JSON.stringify(state),
        content: renderToString(
            <Provider store={store}>
                <StaticRouter location={event.path} context={routerContext}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        ),
        title: 'Hello world!',
        stylesheets: [
            'https://cdn.rawgit.com/tonsky/FiraCode/1.205/distr/fira_code.css',
            'https://s3-us-west-2.amazonaws.com/asdsgn.net/app.css'
        ],
        scripts: [
            'https://s3-us-west-2.amazonaws.com/asdsgn.net/client.js'
        ]
    };
    response.body = ct(data);
    if(routerContext.status === 404) {
        response.statusCode = 404;
    }

    callback(null, response);
};
