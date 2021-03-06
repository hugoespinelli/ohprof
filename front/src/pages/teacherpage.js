import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { withRouter } from 'react-router';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { withSnackbar } from 'notistack';

import "react-circular-progressbar/dist/styles.css";

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Typography  from '@material-ui/core/Typography';
import Button  from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import VoteDialog from '../components/votedialog';
import Requester from '../services/requester';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing(3)
  },
  btn: {
    marginTop: theme.spacing(2)
  }
}));

function TeacherPage({history, enqueueSnackbar}) {
  const classes = useStyles();
  const { palette } = useTheme();
  let { teacherId } = useParams();
  const is_small_screen = useMediaQuery('(max-width: 500px)');

  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState({});

  useEffect( () => {
    const fetchData = async () => {
      try {
        const { data } = await Requester.get(`/professores/${teacherId}`);
        setTeacher(data);
      } catch (e) {
        enqueueSnackbar('Não foi possível buscar o professor, verifique a conexão com sua internet', {variant: 'error' });
        console.log(e);
      }
    };
    fetchData();
  }, [teacherId, enqueueSnackbar]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getParagraph(field, value, align = 'left') {
    return (
      <Typography
        variant={'body2'}
        component={'p'}
        align={align}
      >
        <strong>{field}:</strong> {value}
      </Typography>)
  }

  function GridAutoResize({children, mobile}) {
    if (mobile) {
      return (
        <Grid item xs={6}>
          { children }
        </Grid>
      );
    }
    return (
      <Grid item style={{width: `25%`}}>
        { children }
      </Grid>
    );
  }

  function getCircularsProgress(params) {

    return (
      params.map(({field, msg, value, min, max}) => (
        <GridAutoResize key={field+msg+value} mobile={is_small_screen}>
          <CircularProgressbarWithChildren
            minValue={min}
            maxValue={max}
            value={value}
            strokeWidth={2}
            styles={buildStyles({
              pathColor: palette.secondary.light
            })}
          >
            <Typography variant={'button'} >{field}</Typography>
            <Typography variant={'caption'} align={'center'} color={'textSecondary'} >{msg}</Typography>
            <Typography variant={'caption'} align={'center'} color={'textSecondary'} >{value}/{max}</Typography>
          </CircularProgressbarWithChildren>
        </GridAutoResize>
      ))
    );
  }

  const { nome, materia, skills, votos, faculdade} = teacher;

  function wrapperNull(func) {
    function wrap(args) {
      return Array.isArray(args) ? func(args) : [];
    }
    return wrap;
  }

  function transformSkills(skills) {
    return skills.map(({nome, nota, mensagem, nota_min, nota_max}) =>
      ({field: nome, msg: mensagem, value: nota, min: nota_min, max: nota_max})
    );
  }

  const transformSkillWithoutNull = wrapperNull(transformSkills);
  const skillsTransformed = transformSkillWithoutNull(skills);

  return (
    <>
      <Grid container justify='flex-start'>
        <Fab color="default" aria-label="add" size={"small"} onClick={() => history.goBack()}>
          <ArrowBackIosIcon style={{width: '16px'}} />
        </Fab>
      </Grid>
      <br />
      <Grid container justify='center'>
        <Paper className={classes.paper}>

          <Grid container>

            <Grid container item xs={12} sm={6} justify={'flex-start'} direction='column'>

              {getParagraph('Nome', nome)}
              {getParagraph('Faculdade', faculdade)}
              {getParagraph('Matéria', materia)}
              {getParagraph('Votos', votos)}

              {getParagraph('Selos')}
            </Grid>

            <Grid container item xs={12} sm={6}>
              <Grid item xs={12}>
                {getParagraph('Skills')}
              </Grid>

              <Grid container spacing={3} style={{padding: '0 16px'}}>
                { getCircularsProgress(skillsTransformed)}
              </Grid>
            </Grid>

          </Grid>

        </Paper>

        <Button
          color={'primary'}
          variant={"contained"}
          className={classes.btn}
          onClick={() => handleClickOpen()}
        >
          <Typography variant={'button'}>quero votar :)</Typography>
        </Button>
      </Grid>

      <VoteDialog open={open} handleClose={() => handleClose()} teacherId={teacherId}/>

      <br />
      <br />
      <br />
      <Typography variant={'caption'} color={'textSecondary'}>
        * As informações mostradas nesse site refletem apenas os votos dos alunos,
          eles NÃO refletem a realidade.

      </Typography>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </>
  );
}

export default withSnackbar(withRouter(TeacherPage));
