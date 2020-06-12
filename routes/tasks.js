const router = require('express').Router();
let Task = require('../models/task');

router.route('/').get((req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const level = req.body.level;
  const dueDate = Date.parse(req.body.dueDate);

  const newTask = new Task({ description, level, dueDate });

  newTask
    .save()
    .then(() => res.json('Task Added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// new post task
// router.post('/add', auth, async (req, res) => {
//   try {
//     // const user = await User.findById(req.user.id).select('-password');
//     const description = req.body.description;
//     const level = req.body.level;
//     const dueDate = Date.parse(req.body.dueDate);

//     const newTask = new Task({
//       description,
//       level,
//       dueDate,
//     });

//     const task = await newTask.save();

//     res.json(task);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task Deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.description = req.body.description;
      task.level = req.body.level;
      task.dueDate = Date.parse(req.body.dueDate);

      task
        .save()
        .then(() => res.json('Task Updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
