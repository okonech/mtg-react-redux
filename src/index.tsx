import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Route} from 'react-router';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import LoggedInLandingPage from './pages/LoggedInLandingPage';
import SinglePlayerGame from './pages/SinglePlayerGame';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


ReactDOM.render(
    <div className= 'fullSize' >
    <Provider store= {store} >
        <HashRouter>
            <div className= 'fullSize' >
                <Route exact={true} path = '/' component = {App} />
                <Route path= '/player' component = {LoggedInLandingPage}/>
                <Route path = '/test-game' component = {SinglePlayerGame}/>
            </div>
        </HashRouter>
    </Provider>
    </div>,
    document.getElementById('root'));
registerServiceWorker();