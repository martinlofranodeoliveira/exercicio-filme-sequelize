const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.list);
router.get('/detail/:id', genresController.detail);
router.get('/new', genresController.new);
router.post('/create', genresController.create);
router.get('/edit/:id', genresController.edit);
router.put('/update/:id', genresController.update);
router.delete('/delete/:id', genresController.delete);


module.exports = router;