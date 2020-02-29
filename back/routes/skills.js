var express = require('express');
var router = express.Router();

const Skill = require('../services/skills');

router.get('/', async function(req, res) {
  try {
    let skills = await Skill.list();
    skills = skills.map(skill => skill.transformOptionsToJson());
    res.json(skills);
  } catch(error){
    res.status(500).json({error})
  }
});


module.exports = router;
