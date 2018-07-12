import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './conponents/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import Store from './conponents/Store';

ReactDOM.render(
        <Provider store={Store}>
            <App/>
        </Provider>
    , document.getElementById('root'));
registerServiceWorker();
