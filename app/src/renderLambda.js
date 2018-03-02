import hb from 'handlebars';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Hello from './Components/Hello.jsx';
import index from './index.hbs';

export default (event, context, callback) => {
    const ct = hb.compile(index);
    const state = {
        name: 'World',
        adj: 'beautiful'
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
