import './css/app.css';

import React from 'react';
import {render} from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import routes from './js/routes.js';
import reducer from './js/reducers/app.js';

const state = window.INIT_STATE || {};
const store = createStore(reducer, state, applyMiddleware(thunk));

const AppRouter = () => (
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    </Provider>
);

render(<AppRouter />, document.getElementById('app'));
