var express = require('express');
var router = express.Router();

const Teacher = require('../services/teacher');
const Vote = require('../services/vote');

router.get('/', async function(req, res) {
  const { nome, page = 0 } = req.query;
  try {
    let { results, total } = await Teacher.list(page, 'nome', nome);
    results = results.map(teacher => teacher.concatCourseAndCollege());
    res.json({results, total});
  } catch(error){
    res.status(500).json({error})
  }
});

router.get('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    let teacher = await Teacher.get(id);
    teacher.concatCourseAndCollege();
    teacher.buildSkillsMessages();
    res.json(teacher);
  } catch(error){
    res.status(500).json({error})
  }
});

router.post('/:id/votos', async function(req, res) {
  const { id } = req.params;
  const { skills } = req.body;
  try {
    const votes = await Vote.teacher(id, skills);
    res.json(votes);
  } catch(error){
    res.status(500).json({error})
  }
});

module.exports = router;
