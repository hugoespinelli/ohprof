const { Model } = require('objection');

class College extends Model{

  static get tableName() {
    return 'faculdades';
  }

  static get idColumn() {
    return 'id';
  }

}

module.exports = College;
