
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {BrowserRouter} from "react-router-dom";
import App from './components/app';

import {store} from './store';

require('dotenv').config();

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);