const { Model } = require('objection');

class Course extends Model{

  static get tableName() {
    return 'materias';
  }

  static get idColumn() {
    return 'id';
  }

}

module.exports = Course;
