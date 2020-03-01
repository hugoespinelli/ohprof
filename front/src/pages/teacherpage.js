import React, {useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { withSnackbar } from 'notistack';

import "react-circular-progressbar/dist/styles.css";

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Typography  from '@material-ui/core/Typography';
import Button  from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Badge from '../components/badge';
import VoteDialog from '../components/votedialog';
import jiggly from '../badges/jiggly.png';
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

  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState({});

  useEffect( () => {
    const fetchData = async () => {
      const { data, status} = await Requester.get(`/professores/${teacherId}`);
      if (status < 300) {
        setTeacher(data);
      } else {
        enqueueSnackbar('Não foi possível buscar o professor', {variant: 'error' });
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

  function getCircularsProgress(params) {

    return (
      params.map(({field, msg, value, min, max}) => (
        <Grid item style={{width: `calc(100%/${params.length})`}} key={field+msg+value} xs={6} sm>
          <CircularProgressbarWithChildren
            minValue={min}
            maxValue={max}
            value={value}
            strokeWidth={2}
            styles={buildStyles({
              pathColor: palette.secondary.dark,
              trailColor: palette.secondary.light
            })}
          >
            <Typography variant={'button'} >{field}</Typography>
            <Typography variant={'caption'} align={'center'} color={'textSecondary'} >{msg}</Typography>
            <Typography variant={'caption'} align={'center'} color={'textSecondary'} >{value}/{max}</Typography>
          </CircularProgressbarWithChildren>
        </Grid>
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
        <Link to="/">Voltar</Link>
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
              <Badge src={jiggly} alt={'selo jiggly'} tooltip={'Ótimo para dormir'}/>
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
    </>
  );
}

export default withSnackbar(withRouter(TeacherPage));
