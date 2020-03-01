require('dotenv').config();
const cron = require("node-cron");
const express = require("express");

const { deleteOldVotes, insertNewVotes, updateCountVotes } = require('./routines');

app = express();

function log(msg) {
  console.log(`[${new Date(Date.now()).toString()}] - ${msg}`);
}

cron.schedule("* * * * *", async () => {
  log('Iniciando atualização de votos');

  log("Deletando votos...");
  await deleteOldVotes();
  log("Votos deletados.");

  log("Inserindo novos votos...");
  await insertNewVotes();
  log("Votos inseridos.");

  log("Atualizando numero de votos de professores...");
  await updateCountVotes();
  log("Numero de votos de professores atualizado.");

  log('Atualização de votos finalizada');
});

log('Cron rodando...');

app.listen(1313);
