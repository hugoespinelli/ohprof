const { FETCH_LIMIT } = require('../consts');
const { Model } = require('objection');
const { stringConcatByField } = require('../utils');

class Teacher extends Model{

  static get tableName() {
    return 'professores';
  }

  static get idColumn() {
    return 'id';
  }

  static list(page, filter, by = '') {
    try {
      return Teacher.query()
        .withGraphFetched('[faculdades, materias]')
        .where(filter, 'like', `%${by}%`)
        .orderBy('nome', 'asc')
        .page(page, FETCH_LIMIT);
    } catch(e) {
      throw new Error(e);
    }

  }

  static get(id) {
    return Teacher.query()
      .findOne({id})
      .withGraphFetched('[faculdades, materias, skills.mensagem]')
  }

  static get relationMappings() {
    const College = require('./college');
    const Course = require('./course');
    const Skills = require('./skills');

    const college_teacher_relation_table = 'professores_faculdades';
    const course_teacher_relation_table = 'professores_materias';
    const skills_teacher_relation_table = 'atualizacao_professores_skills';

    return {
      faculdades: {
        relation: Model.ManyToManyRelation,
        modelClass: College,
        join: {
          from: `${Teacher.tableName}.${Teacher.idColumn}`,
          through: {
            from: `${college_teacher_relation_table}.id_professor`,
            to: `${college_teacher_relation_table}.id_faculdade`
          },
          to: `${College.tableName}.${College.idColumn}`
        }
      },
      materias: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: `${Teacher.tableName}.${Teacher.idColumn}`,
          through: {
            from: `${course_teacher_relation_table}.id_professor`,
            to: `${course_teacher_relation_table}.id_materia`
          },
          to: `${Course.tableName}.${Course.idColumn}`
        }
      },
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skills,
        join: {
          from: `${Teacher.tableName}.${Teacher.idColumn}`,
          through: {
            from: `${skills_teacher_relation_table}.id_professor`,
            to: `${skills_teacher_relation_table}.id_skill`
          },
          to: `${Skills.tableName}.${Skills.idColumn}`
        },
        filter: builder => builder.select('nome', 'nota_min', 'nota_max', 'nota')
      }
    }
  }

  concatCourseAndCollege() {
    this.materias = stringConcatByField(this.materias, 'nome');
    this.faculdades = stringConcatByField(this.faculdades, 'nome');
    return this;
  }

  buildSkillsMessages() {
    this.skills = this.skills.map(skill => skill.buildMessage());
  }

}

module.exports = Teacher;
