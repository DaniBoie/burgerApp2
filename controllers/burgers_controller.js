const router = require('express').Router()
const db = require('../config/connection.js')
const burger = require('../models/burger.js')

router.get('/burgers', (req, res) => {
  burger.getAll(burgers => {
    res.json(burgers)
  })
})

router.post('/burgers', (req, res) => {
  burger.createOne(req.body, id => {
    res.json({ id })
  })
})

router.put('/burgers/:id', (req, res) => {
  burger.updateOne(req.body, { id: req.params.id }, () => {
    res.sendStatus(200)
  })
})

router.delete('/burgers/:id', (req, res) => {
  burger.deleteOne({ id: req.params.id }, () => {
    res.sendStatus(200)
  })
})

module.exports = router