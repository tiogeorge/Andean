const express = require('express');
const router = express.Router();

const chat = require('../controllers/chat.controller');

router.get('/', chat.getConversaciones);
router.get('/:id', chat.getMensajes);
router.post('/', chat.nuevaConversacion);
router.post('/:conversacionId', chat.enviarRespuesta);

module.exports = router;