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
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import Homepage from './pages/homepage'
import Teacherpage from './pages/teacherpage'
import logo from './logoohprof.png'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  spaceTop: {
    marginTop: theme.spacing(2)
  },
  footer: {
    marginTop: theme.spacing(4),
    backgroundColor: grey[900],
    padding: theme.spacing(1),
    color: grey[500]
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
        <Grid item xs={12} className={classes.spaceTop}>
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

        <br />
        <br />
        <br />
        <Grid conntainer justify={'center'} className={classes.footer}>
          <Typography variant={'caption'}>© 2020 Hugo Espinelli.  All rights reserved. </Typography>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
