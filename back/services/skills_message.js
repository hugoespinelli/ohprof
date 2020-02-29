const { Model } = require('objection');

class SkillsMessage extends Model{

  static get tableName() {
    return 'skills_mensagem';
  }

  static get idColumn() {
    return 'id_skill';
  }

}

module.exports = SkillsMessage;
