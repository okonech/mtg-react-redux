
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import FourPlayerGame from './routes/FourPlayerGame';
import FourPlayerGameOther from './routes/FourPlayerGameOther';
import LoggedInLandingPage from './routes/LoggedInLandingPage';
import LoginPage from './routes/LoginPage';
import SinglePlayerGame from './routes/SinglePlayerGame';
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
  },
  typography: {
    useNextVariants: true
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
        <HashRouter>
          <React.Fragment>
            <Route exact={true} path='/' component={LoginPage} />
            <Route path='/player' component={LoggedInLandingPage} />
            <Route path='/test-game' component={SinglePlayerGame} />
            <Route path='/test-two-player-game' component={TwoPlayerGame} />
            <Route path='/test-four-player-game' component={FourPlayerGame} />
            <Route path='/test-four-player-game-other' component={FourPlayerGameOther} />
          </React.Fragment>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
