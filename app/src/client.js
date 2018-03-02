import React from 'react';
import {render} from 'react-dom';
import Hello from './Components/Hello.jsx';

const state = window.INIT_STATE || {};

render(<Hello name={state.name} adj={state.adj} />, document.getElementById('app'));

