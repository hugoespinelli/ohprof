require('dotenv').config();
const cron = require("node-cron");
const express = require("express");

const { deleteOldVotes, insertNewVotes, updateCountVotes } = require('./routines');

app = express();

function log(msg) {
  console.log(`[${new Date(Date.now()).toString()}] - ${msg}`);
}

cron.schedule("*/10 * * * *", async () => {
  log('Iniciando atualização de votos');

  try {
    log("Deletando votos...");
    await deleteOldVotes();
    log("Votos deletados.");

    log("Inserindo novos votos...");
    await insertNewVotes();
    log("Votos inseridos.");

    log("Atualizando numero de votos de professores...");
    await updateCountVotes();
    log("Numero de votos de professores atualizado.");
  } catch (e) {
    log('Ocorreu um erro na rotina');
    log(e);
    process.exit(1);
  }


  log('Atualização de votos finalizada');
});

log('Cron rodando...');

app.listen(1313);
