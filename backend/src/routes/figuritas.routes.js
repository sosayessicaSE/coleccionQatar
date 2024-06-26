import express from "express";
import {
  getFiguritas,
  getFigurita,
  createFiguritas,
  deleteFiguritas,
  resetearFiguritas,
  updateFiguritaCantidad,
} from "../controllers/figuritas.controller.js";

const router = express.Router();

// GET /figuritas - obtener todas las figuritas
router.get("/", getFiguritas);

// GET /figuritas/:id - obtener una figurita por su ID
router.get("/:id", getFigurita);

// POST /figuritas - crear una nueva figurita
router.post("/", createFiguritas);

// PUT /figuritas/:id/cantidad - actualizar la cantidad de una figurita por su ID
router.put("/:id/cantidad", updateFiguritaCantidad);

// DELETE /figuritas/:id - eliminar una figurita por su ID
router.delete("/:id", deleteFiguritas);

// PUT /figuritas - resetear las figuritas
router.post("/reset", resetearFiguritas);

export default router;
