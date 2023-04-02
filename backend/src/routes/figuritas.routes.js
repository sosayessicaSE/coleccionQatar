import express from 'express';
import {
  getFiguritas,
  getFigurita,
  createFiguritas,
  deleteFiguritas,
  resetearFiguritas,
  updateFiguritaCantidad,
} from '../controllers/figuritas.controller.js';

const router = express.Router();

// GET /figuritas - obtener todas las figuritas
router.get('/figuritas', getFiguritas);

// GET /figuritas/:id - obtener una figurita por su ID
router.get('/figuritas/:id', getFigurita);

// POST /figuritas - crear una nueva figurita
router.post('/figuritas', createFiguritas);

// PUT /figuritas/:id/cantidad - actualizar la cantidad de una figurita por su ID
router.put('/figuritas/:id/cantidad', updateFiguritaCantidad);

// DELETE /figuritas/:id - eliminar una figurita por su ID
router.delete('/figuritas/:id', deleteFiguritas);

// PUT /figuritas - resetear las figuritas
router.put('/figuritas', resetearFiguritas);

export default router;
