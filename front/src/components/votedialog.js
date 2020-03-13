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
      enqueueSnackbar('Voto efetuado com sucesso! Ele será calculado brevemente :D', {variant: 'success'});
    }
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      scroll={'body'}
      PaperProps={{style: {overflowY: 'visible'}}}
    >
      <DialogTitle id="form-dialog-title">Votação</DialogTitle>
      <DialogContent style={{ overflowY: 'visible' }}>
        <DialogContentText>
          Agora vamos votar nesse professor. Vote consciente, tem abiguinhos que precisam disso :D.
        </DialogContentText>

        { createSelects(questions) }

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
