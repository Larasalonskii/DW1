const express = require('express');
const multer = require('multer');
const router = express.Router();
const tipoQuartoController = require('../controllers/tipoQuartoController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/listar', tipoQuartoController.listarTipos);
router.post('/upload/:id', upload.single('imagem'), tipoQuartoController.uploadImagemTipo);

module.exports = router;