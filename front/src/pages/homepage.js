import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames'; 
import MaterialTable from 'material-table';
import {DebounceInput} from 'react-debounce-input';
import { withSnackbar } from 'notistack';
import Typist from 'react-typist';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Search from '@material-ui/icons/Search'

import Requester from '../services/requester';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  searchBar: {
    padding: '2px 4px',
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    width: '50%',
  },
  fullWidth: {
    width: '100% !important'
  }
}));

function Homepage({history, enqueueSnackbar}) {
  const classes = useStyles();
  const is_small_screen = useMediaQuery('(max-width: 500px)');
  const [teachers, setTeachers] = useState([]);
  const [searchField, setSearchField] = useState('');

  const fetchTeachers = React.useCallback(async () => {
    try {
      const { data } = await Requester.get(`/professores?nome=${searchField}`);
      setTeachers(data.results);
    } catch (e) {
      enqueueSnackbar('Não foi possível buscar os professores! Verifque sua conexão com a internet :(', {variant: 'error' });
    }

  }, [searchField, enqueueSnackbar]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  function searcher() {
    fetchTeachers();
  }

  function renderMobileSearchbar() {
    const paperClasses = classNames(classes.searchBar, classes.fullWidth);
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={paperClasses}>
            <IconButton className={classes.iconButton} aria-label="procurar prof">
              <Search />
            </IconButton>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              onChange={event => setSearchField(event.target.value)}
              className={classes.fullWidth}
              placeholder={"Digite o nome do prof..."}
              inputProps={{ 'aria-label': 'digite o nome do prof' }}
              element={InputBase}
              value={searchField}
            />
          </Paper>
        </Grid>

        <Grid container item xs={12} justify='center'>
          <Button variant="contained" color="primary" onClick={() => searcher(searchField)}>
            Procurar
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderLargeScreenSearchbar() {
    return (
      <>
        <Grid container justify='center'>
          <Paper className={classes.searchBar}>
            <IconButton className={classes.iconButton} aria-label="procurar prof">
              <Search />
            </IconButton>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              onChange={event => setSearchField(event.target.value)}
              className={classes.fullWidth}
              placeholder={"Digite o nome do prof..."}
              inputProps={{ 'aria-label': 'digite o nome do prof' }}
              element={InputBase}
              value={searchField}
            />

          </Paper>
          <Button variant="contained" color="primary" onClick={() => searcher(searchField)}>
            Procurar
          </Button>
        </Grid>

      </>
    );
  }

  function mountColumn(field, title, render = null) {
    return render ? {field, title, render} : {field, title};
  }

  return (
    <>
      <Grid container justify={'center'}>
        <Grid item xs={12}>
          <Typography variant={'h2'} color={'textSecondary'}>
            <Typist startDelay={1000}>
              Ache o seu professor ideal
            </Typist>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'subtitle1'} color={'textSecondary'}>
            Sistema de ranqueamento de professores universitários
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Grid container justify='center'>

        { is_small_screen ? renderMobileSearchbar() : renderLargeScreenSearchbar()}
        
      </Grid>
      <br />
      <br />
      <Grid container justify='center'>

      <MaterialTable
        columns={[
          mountColumn('nota', 'Nota'),
          mountColumn('nome', 'Nome'),
          mountColumn('faculdade', 'Faculdade'),
        ]}
        options={{
          showTitle: false,
          search: false,
          toolbar: false,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'Não há professores'
          }
        }}
        style={{
          width: '80%'
        }}
        data={teachers}
        onRowClick={((evt, selectedRow) => history.push(`/professor/${selectedRow.id}`) )}
      />

      </Grid>
    </>
  );
}

export default withSnackbar(withRouter(Homepage));
