var express = require('express');
var router = express.Router();
const Todo = require('../controllers/todo.controller')
const images = require('../helpers/images')

/* GET users listing. */
router.get('/:id', Todo.read)
router.post('/',images.multer.single('image'),images.sendUploadToGCS,Todo.create)
router.put('/:id', Todo.complete)
router.delete('/:id', Todo.delete)

module.exports = router;
