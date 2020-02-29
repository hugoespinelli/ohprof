
function stringConcatByField(arr, field, separator = ', ') {
  let joined = [];
  arr.map(el => joined.push(el[field]));
  return joined.join(separator);
}

module.exports = { stringConcatByField };
