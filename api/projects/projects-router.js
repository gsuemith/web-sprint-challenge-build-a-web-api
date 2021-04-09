const express = require('express')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')
const { checkDatabase, validateProject } = require('./projects-middleware')

// Write your "projects" router here!
const router = express.Router()

router.use('/:id', checkDatabase)

// [GET]
router.get('/', (req, res, next) => {
  Project.get()
  .then(projects => {
    projects.forEach(project => {
      project.completed = project.completed ? true : false
    })
    res.status(200).json(projects)
  })
  .catch(err => next(err))
})

router.get('/:id', (req, res) => {
  res.status(200).json(req.project)
})

router.get('/:id/actions', (req, res, next) => {
  Project.getProjectActions(req.params.id)
  .then(actions => {
    res.status(200).json(actions)
  })
  .catch(err => next(err))
})

// [POST]
router.post('/', validateProject, (req, res, next) => {
  Project.insert(req.body)
  .then(project => {
    project.completed = project.completed ? true : false
    res.status(201).json(project)
  })
  .catch(err => next(err))
})

// [PUT]
router.put('/:id', validateProject, (req, res, next) => {
  Project.insert(req.body)
  .then(project => {
    res.status(200).json(project)
  })
  .catch(err => next(err))
})

// [DELETE]
router.delete('/:id', (req, res, next) => {
  Project.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'Project deleted' })
  })
  .catch(err => next(err))
})

module.exports = router