const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const currentAddedTodos = await redis.getAsync('added_todos')
  const newAddedTodos = Number(currentAddedTodos) + 1
  await redis.setAsync('added_todos', newAddedTodos)
  
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoToUpdate = req.todo
  const newText = req.body.hasOwnProperty('text') ? req.body.text : todoToUpdate.text
  const newDone = req.body.hasOwnProperty('done') ? req.body.done : todoToUpdate.done

  const newData = {
    text: newText,
    done: newDone
  }

  try {
    await Todo.updateOne({ _id: req.todo.id }, newData)
    res.send(200)
  } catch (error) {
    res.send(error).sendStatus(500)
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
