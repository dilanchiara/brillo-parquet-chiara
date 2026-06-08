import CitaModel from '../models/CitaModel.js';
import { validationResult } from 'express-validator';

export const obtenerCitas = async (req, res) => {
    try {
        const citas = await CitaModel.getAll();
        res.status(200).json({
            success: true,
            count: citas.length,
            data: citas
        });
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

export const obtenerCitaPorId = async (req, res) => {
    try {
        const cita = await CitaModel.getById(req.params.id);
        if (!cita) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            data: cita
        });
    } catch (error) {
        console.error('Error al obtener cita:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const crearCita = async (req, res) => {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const nuevaCita = await CitaModel.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Cita agendada exitosamente',
            data: nuevaCita
        });
    } catch (error) {
        console.error('Error al crear cita:', error);
        res.status(500).json({
            success: false,
            message: 'Error al guardar la cita',
            error: error.message
        });
    }
};

export const actualizarCita = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const citaExistente = await CitaModel.getById(req.params.id);
        if (!citaExistente) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }

        const citaActualizada = await CitaModel.update(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Cita actualizada exitosamente',
            data: citaActualizada
        });
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la cita'
        });
    }
};

export const cambiarEstadoCita = async (req, res) => {
    const { estado } = req.body;
    const { id } = req.params;
    const confirmadoPor = req.user?.usuario || 'admin';

    const estadosValidos = ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
            success: false,
            message: 'Estado no válido'
        });
    }

    try {
        const citaExistente = await CitaModel.getById(id);
        if (!citaExistente) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }

        const actualizado = await CitaModel.updateEstado(id, estado, confirmadoPor);
        
        if (actualizado) {
            res.status(200).json({
                success: true,
                message: `Cita ${estado.toLowerCase()} exitosamente`,
                estado: estado
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el estado'
            });
        }
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const eliminarCita = async (req, res) => {
    try {
        const citaExistente = await CitaModel.getById(req.params.id);
        if (!citaExistente) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }

        const eliminada = await CitaModel.delete(req.params.id);
        
        if (eliminada) {
            res.status(200).json({
                success: true,
                message: 'Cita eliminada exitosamente'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la cita'
            });
        }
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const obtenerEstadisticas = async (req, res) => {
    try {
        const estadisticas = await CitaModel.getEstadisticas();
        res.status(200).json({
            success: true,
            data: estadisticas
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas'
        });
    }
};