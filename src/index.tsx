import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './reduxDefs/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store= {store} >
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();