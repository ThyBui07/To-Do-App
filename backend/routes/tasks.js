const express = require('express');

const router = express.Router();

const Task = require('../models/task');

router.post('/',(req, res, next) => {
  const task = new Task({
    content: req.body.content
  });
  console.log(task);
  //save method provided by mongoose package
  task.save().then(createdTask => {
    res.status(201).json({
      message: 'post created successfully',
      //_id is generated automatically from mongoose
      taskId: createdTask._id
    });
  });

});

router.get('/', (req, res, next) => {
  Task.find().then((documents) => {
    res.status(200).json({
        taskList: documents
      });
  });
});

router.delete('/:id', (req, res, next) => {
  Task.deleteOne({_id: req.params.id})
      .then(deleteResult => {
        console.log(deleteResult);
        res.status(200).json({
          message: 'post deleted successfully'
        });
      });

});

module.exports = router;