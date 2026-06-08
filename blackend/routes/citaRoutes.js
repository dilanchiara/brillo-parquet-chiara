import express from 'express';
import {
    obtenerCitas,
    obtenerCitaPorId,
    crearCita,
    actualizarCita,
    cambiarEstadoCita,
    eliminarCita,
    obtenerEstadisticas
} from '../controllers/citaController.js';
import { validarCita, validarActualizacionEstado } from '../middleware/validation.js';

const router = express.Router();

// Rutas públicas (crear cita)
router.post('/', validarCita, crearCita);

// Rutas protegidas (admin)
router.get('/', obtenerCitas);
router.get('/estadisticas', obtenerEstadisticas);
router.get('/:id', obtenerCitaPorId);
router.put('/:id', validarCita, actualizarCita);
router.patch('/:id/estado', validarActualizacionEstado, cambiarEstadoCita);
router.delete('/:id', eliminarCita);

export default router;