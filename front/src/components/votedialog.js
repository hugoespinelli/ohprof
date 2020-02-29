import React, { useEffect } from 'react';
import { withSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SelectWithLabel from './selectwithlabel';
import Requester from '../services/requester';

function VoteDialog({open, handleClose, enqueueSnackbar, teacherId}) {

  const [questions, setQuestions] = React.useState([]);
  const answers = [];

  useEffect(() => {
    const fetchData = async () => {
      const result = await Requester.get('/skills');
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  function onChange(id, {value}) {
    const answer = answers.find(answer => answer.id === id);
    if (answer) {
      answer.value = value;
    }
    answers.push({id, value});
  }

  function createSelects(questions) {
    return questions.map(({nome, opcoes, id}) => (
      <SelectWithLabel
        key={id}
        label={nome}
        options={opcoes}
        onChange={(value) => onChange(id, value)}
      />));
  }

  async function vote() {
    const result = await Requester.post(`/professores/${teacherId}/votos`, {skills: answers});
    if (result.status < 300) {
      enqueueSnackbar('Voto efetuado com sucesso', {variant: 'success'});
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll={'body'}>
      <DialogTitle id="form-dialog-title">Votação</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Agora vamos votar nesse professor. Vote consciente, tem abiguinhos que precisam disso :D.
        </DialogContentText>

        { createSelects(questions) }

        {/*<SelectWithLabel*/}
        {/*  label={'Explicação'}*/}
        {/*  options={[*/}
        {/*    {label: 'Fala grego', value: 0},*/}
        {/*    {label: 'Compreensível, mas dá sono', value: 1},*/}
        {/*    {label: 'Entendo direitinho', value: 2},*/}
        {/*    {label: 'Nem vejo a hora passar', value: 3},*/}
        {/*  ]}*/}
        {/*  onChange={(value) => setExplicacao(value)}*/}
        {/*/>*/}

        {/*<SelectWithLabel*/}
        {/*  label={'Presença'}*/}
        {/*  options={[*/}
        {/*    {label: 'Não', value: -1},*/}
        {/*    {label: 'É de lua, cobra quando quer', value: 0},*/}
        {/*    {label: 'Sim', value: 1},*/}
        {/*  ]}*/}
        {/*  onChange={(value) => setPresenca(value)}*/}
        {/*/>*/}

        {/*<SelectWithLabel*/}
        {/*  label={'Prova'}*/}
        {/*  options={[*/}
        {/*    {label: 'Dá não', value: 0},*/}
        {/*    {label: 'Estuda mucho', value: 1},*/}
        {/*    {label: 'Dou aquela revisada antes da prova', value: 2},*/}
        {/*    {label: 'Preciso saber nem que dia é a prova', value: 3},*/}
        {/*  ]}*/}
        {/*  onChange={(value) => setProva(value)}*/}
        {/*/>*/}

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={() => vote()} color="secondary">
          Votar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withSnackbar(VoteDialog);
