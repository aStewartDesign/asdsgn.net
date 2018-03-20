import React from 'react';
import {render} from 'react-dom';
import Hello from './js/Components/Hello.jsx';

import './css/app.css';

const state = window.INIT_STATE || {};

render(<Hello name={state.name} adj={state.adj} />, document.getElementById('app'));

