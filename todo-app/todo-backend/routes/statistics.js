const express = require('express');
const router = express.Router();

const redis = require('../redis');

router.get('/', async (req, res) => {
  const addedTodosCount = await redis.getAsync('added_todos');

  res.send({
    "added_todos": Number(addedTodosCount)
  })
});

module.exports = router;