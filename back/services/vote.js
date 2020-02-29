const { Model } = require('objection');

class Vote extends Model{

  static get tableName() {
    return 'votos_professores_skills';
  }

  static teacher(teacherId, skills) {
    return Promise.all(skills.map(({id, value}) =>
      Vote.query().insert({
        id_professor: teacherId,
        id_skill: id,
        nota: value
      })
    ));
  }

}

module.exports = Vote;
