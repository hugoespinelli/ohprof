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

import Homepage from './pages/homepage';
import Teacherpage from './pages/teacherpage';
import logo from './logoohprof.png';
import Footer from './components/footer';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  spaceTop: {
    marginTop: theme.spacing(2)
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
        <Router>
          <Grid item xs={12} className={classes.spaceTop}>
            <img src={logo} height={80} alt={'logo do oh prof!'}/>
          </Grid>
          <br/>
          <Container>

            <SnackbarProvider maxSnack={3}>

                <Switch>

                  <Route path='/professor/:teacherId'>
                    <Teacherpage/>
                  </Route>

                  <Route path='/'>
                    <Homepage/>
                  </Route>

                </Switch>

            </SnackbarProvider>
          </Container>

          <br/>
          <br/>
          <br/>
          <Footer classes={classes} />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
