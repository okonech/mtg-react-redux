import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

// TODO: break everything here out into app.tsx and wrap that component with dragsource
ReactDOM.render(
    <div className= 'fullSize' >
    <Provider store= {store} >
        <App />
    </Provider>
    </div>,
    document.getElementById('root'));
registerServiceWorker();