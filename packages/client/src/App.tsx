
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { DragDropContext } from 'react-dnd';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeckEditor from './routes/DeckEditor';
import DecksList from './components/deck-editor/DecksList';
import FourPlayerGame from './routes/FourPlayerGame';
import FourPlayerGameOther from './routes/FourPlayerGameOther';
import HTML5Backend from 'react-dnd-html5-backend';
import LoggedInLandingPage from './routes/LoggedInLandingPage';
import Login from './routes/Login';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import PrivateRoute from './routes/PrivateRoute';
import React, { Component } from 'react';
import Signup from './routes/Signup';
import SinglePlayerGame from './routes/SinglePlayerGame';
import TouchBackend from 'react-dnd-touch-backend';
import TwoPlayerGame from './routes/TwoPlayerGame';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5'
    },
    secondary: {
      main: '#d81b60'
    },
    type: 'dark'
  }
});

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({ enableMouseEvents: true }), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};

class App extends Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact={true} path='/login' component={Login} />
            <Route exact={true} path='/signup' component={Signup} />
            <PrivateRoute exact={true} path='/' component={LoggedInLandingPage} />
            <PrivateRoute exact={true} path='/deck-editor' component={DecksList} />
            <PrivateRoute path='/deck-editor/:id' component={DeckEditor} />
            <PrivateRoute path='/test-game' component={SinglePlayerGame} />
            <PrivateRoute path='/test-two-player-game' component={TwoPlayerGame} />
            <PrivateRoute path='/test-four-player-game' component={FourPlayerGame} />
            <PrivateRoute path='/test-four-player-game-other' component={FourPlayerGameOther} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
