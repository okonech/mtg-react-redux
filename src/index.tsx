import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
    <div className= 'fullSize' >
    <Provider store= {store} >
        <App />
    </Provider>
    </div>,
    document.getElementById('root'));
registerServiceWorker();