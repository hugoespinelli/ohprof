const knex = require('./db');

const TABLES = {
  attTeachSkill: 'atualizacao_professores_skills'
};

function deleteOldVotes() {
  return knex(TABLES.attTeachSkill).del();
}

function insertNewVotes() {
  return knex.raw(`
  INSERT INTO atualizacao_professores_skills 
              (id_professor, 
               id_skill, 
               nota) 
  SELECT vps.id_professor, 
         vps.id_skill, 
         CASE 
           WHEN s.calculate_method = 'sum' THEN IF(SUM(vps.nota) >= 100, 100, 0) 
           WHEN s.calculate_method = 'average' THEN Round(Avg(vps.nota)) 
         END AS calculado 
  FROM   votos_professores_skills vps 
         join skills AS s 
           ON vps.id_skill = s.id 
  GROUP  BY id_professor, 
            id_skill; 
  `);
}

function updateCountVotes() {
  return knex.raw(`
    UPDATE professores p 
       LEFT JOIN (SELECT id_professor, 
                         Count(*) AS votos 
                  FROM   ohprof.votos_professores_skills 
                  GROUP  BY id_professor) AS table_counter 
              ON table_counter.id_professor = p.id 
       LEFT JOIN (SELECT id_professor, 
                         Avg(nota) AS nota 
                  FROM   atualizacao_professores_skills aps 
                  GROUP  BY id_professor) AS table_grade 
              ON table_grade.id_professor = p.id 
    SET    p.votos = table_counter.votos, 
           p.nota = table_grade.nota 
    WHERE  table_counter.id_professor IS NOT NULL; 
  `);
}


module.exports = { deleteOldVotes, insertNewVotes, updateCountVotes};
