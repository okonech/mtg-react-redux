import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={reducers} >
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
