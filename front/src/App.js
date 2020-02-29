import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Homepage from './pages/homepage'
import Teacherpage from './pages/teacherpage'
import logo from './logoohprof.png'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(1)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fd5e53',
    },
    secondary: {
      main: '#21bf73',
    }
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Grid item xs={12}>
          <img src={logo} height={50} alt={'logo do oh prof!'} />
        </Grid>
        <br />
        <br />
        <br />
        <Container>

          <SnackbarProvider maxSnack={3}>
            <Router>
              <Switch>

              <Route path='/professor/:teacherId'>
                  <Teacherpage />
                </Route>

                <Route path='/'>
                  <Homepage />
                </Route>

              </Switch>
            </Router>
          </SnackbarProvider>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
