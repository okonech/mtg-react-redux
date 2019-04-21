import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import FourPlayerGame from './pages/FourPlayerGame';
import LoggedInLandingPage from './pages/LoggedInLandingPage';
import LoginPage from './pages/LoginPage';
import SinglePlayerGame from './pages/SinglePlayerGame';
import TwoPlayerGame from './pages/TwoPlayerGame';

class App extends Component {
  public render() {
    return (
      <HashRouter>
        <React.Fragment>
          <Route exact={true} path='/' component={LoginPage} />
          <Route path='/player' component={LoggedInLandingPage} />
          <Route path='/test-game' component={SinglePlayerGame} />
          <Route path='/test-two-player-game' component={TwoPlayerGame} />
          <Route path='/test-four-player-game' component={FourPlayerGame} />
        </React.Fragment>
      </HashRouter>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
