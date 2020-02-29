const { Model } = require('objection');

class Skills extends Model {

  static get tableName() {
    return 'skills';
  }

  static get idColumn() {
    return 'id';
  }

  static list() {
    return Skills.query();
  }

  static get relationMappings() {
    const SkillsMessage = require('./skills_message');

    return {
      mensagem: {
        relation: Model.HasManyRelation,
        modelClass: SkillsMessage,
        join: {
          from: `${Skills.tableName}.${Skills.idColumn}`,
          to: `${SkillsMessage.tableName}.${SkillsMessage.idColumn}`
        }
      },
    }
  }

  transformOptionsToJson() {
    this.opcoes = JSON.parse(this.opcoes);
    return this;
  }

  pickMessageGradeCorrelated() {
    let lowest = null;
    this.mensagem.reduce((acc, el)=> {
      let grade = Math.abs(this.nota - el.nota_min);
      if (grade < acc) {
        lowest = el;
        return grade;
      }
      return acc;
    }, Infinity);
    return lowest;
  }

  buildMessage() {
    const { mensagem } = this.pickMessageGradeCorrelated();
    this.mensagem = mensagem;
    return this;
  }

}

module.exports = Skills;
