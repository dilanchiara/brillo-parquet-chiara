import pool from '../config/db.js';

class CitaModel {
    // Obtener todas las citas
    static async getAll() {
        const [rows] = await pool.query(
            'SELECT * FROM citas ORDER BY fecha DESC, fecha_registro DESC'
        );
        return rows;
    }

    // Obtener cita por ID
    static async getById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM citas WHERE id_cita = ?',
            [id]
        );
        return rows[0] || null;
    }

    // Crear nueva cita
    static async create(citaData) {
        const { nombre, telefono, correo, servicio, fecha, observaciones = null } = citaData;
        
        const [result] = await pool.query(
            `INSERT INTO citas (nombre, telefono, correo, servicio, fecha, observaciones, estado) 
             VALUES (?, ?, ?, ?, ?, ?, 'Pendiente')`,
            [nombre, telefono, correo, servicio, fecha, observaciones]
        );
        
        return this.getById(result.insertId);
    }

    // Actualizar cita
    static async update(id, citaData) {
        const { nombre, telefono, correo, servicio, fecha, observaciones } = citaData;
        
        await pool.query(
            `UPDATE citas 
             SET nombre = ?, telefono = ?, correo = ?, servicio = ?, fecha = ?, observaciones = ?
             WHERE id_cita = ?`,
            [nombre, telefono, correo, servicio, fecha, observaciones, id]
        );
        
        return this.getById(id);
    }

    // Cambiar estado de cita
    static async updateEstado(id, estado, confirmadoPor = null) {
        const fechaConfirmacion = estado !== 'Pendiente' ? new Date() : null;
        
        const [result] = await pool.query(
            `UPDATE citas 
             SET estado = ?, fecha_confirmacion = ?, confirmado_por = ?
             WHERE id_cita = ?`,
            [estado, fechaConfirmacion, confirmadoPor, id]
        );
        
        return result.affectedRows > 0;
    }

    // Eliminar cita
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM citas WHERE id_cita = ?', [id]);
        return result.affectedRows > 0;
    }

    // Obtener citas por estado
    static async getByEstado(estado) {
        const [rows] = await pool.query(
            'SELECT * FROM citas WHERE estado = ? ORDER BY fecha ASC',
            [estado]
        );
        return rows;
    }

    // Obtener citas por rango de fechas
    static async getByFechaRange(fechaInicio, fechaFin) {
        const [rows] = await pool.query(
            'SELECT * FROM citas WHERE fecha BETWEEN ? AND ? ORDER BY fecha ASC',
            [fechaInicio, fechaFin]
        );
        return rows;
    }

    // Obtener estadísticas
    static async getEstadisticas() {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN estado = 'Pendiente' THEN 1 ELSE 0 END) as pendientes,
                SUM(CASE WHEN estado = 'Confirmada' THEN 1 ELSE 0 END) as confirmadas,
                SUM(CASE WHEN estado = 'Cancelada' THEN 1 ELSE 0 END) as canceladas,
                SUM(CASE WHEN estado = 'Completada' THEN 1 ELSE 0 END) as completadas
            FROM citas
        `);
        return rows[0];
    }
}

export default CitaModel;