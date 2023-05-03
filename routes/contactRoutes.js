const express = require('express')
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router()
const control = require('./../controllers/contactController')



router.use(validateToken)

router.route('/').get(control.getContacts)

router.route('/').post(control.createContact)

router.route('/:id').get(control.getContact)

router.route('/:id').put(control.updateContact)

router.route('/:id').delete(control.deleteContact)

module.exports = router
