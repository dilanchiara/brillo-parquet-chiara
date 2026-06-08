-- =============================================
-- BASE DE DATOS: brillo_parquet_db
-- =============================================

CREATE DATABASE IF NOT EXISTS brillo_parquet_db;
USE brillo_parquet_db;

-- =============================================
-- TABLA: citas
-- =============================================
CREATE TABLE IF NOT EXISTS citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de la cita',
    nombre VARCHAR(100) NOT NULL COMMENT 'Nombre completo del cliente',
    telefono VARCHAR(20) NOT NULL COMMENT 'Número de teléfono/WhatsApp',
    correo VARCHAR(100) NOT NULL COMMENT 'Correo electrónico',
    servicio VARCHAR(100) NOT NULL COMMENT 'Tipo de servicio solicitado',
    fecha DATE NOT NULL COMMENT 'Fecha agendada',
    estado ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada') DEFAULT 'Pendiente' COMMENT 'Estado de la cita',
    observaciones TEXT NULL COMMENT 'Observaciones adicionales',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro',
    fecha_confirmacion TIMESTAMP NULL COMMENT 'Fecha de confirmación/cancelación',
    confirmado_por VARCHAR(50) NULL COMMENT 'Usuario admin que modificó',
    
    -- Índices para búsquedas rápidas
    INDEX idx_estado (estado),
    INDEX idx_fecha (fecha),
    INDEX idx_telefono (telefono),
    INDEX idx_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de citas agendadas';

-- =============================================
-- TABLA: usuarios_admin (para autenticación)
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios_admin (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(100),
    rol ENUM('admin', 'superadmin') DEFAULT 'admin',
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Usuarios administradores';

-- =============================================
-- TABLA: servicios (catálogo - opcional)
-- =============================================
CREATE TABLE IF NOT EXISTS servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion_estimada INT COMMENT 'Duración en minutos',
    activo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- INSERTAR USUARIO ADMIN DEFAULT
-- Contraseña: 2005 (en texto plano, luego hashear)
-- =============================================
-- Nota: En producción usar bcrypt. Aquí es solo ejemplo
INSERT INTO usuarios_admin (usuario, password_hash, nombre_completo, rol) 
VALUES ('dilan', '$2a$10$EjemploHashPara2005', 'Dilan Chiara', 'superadmin');

-- =============================================
-- INSERTAR SERVICIOS PREDETERMINADOS
-- =============================================
INSERT INTO servicios (nombre, descripcion, duracion_estimada) VALUES
('Colocado, Cepillado y Barnizado', 'Colocado de pisos de parquet, cepillado y barnizado profesional', 480),
('Restauración de Muebles', 'Restauración completa de muebles antiguos y dañados', 360),
('Colocado de Puertas y Arreglos', 'Instalación y ajuste de puertas de madera', 240),
('Figura de Colocado de Parquet', 'Diseños especiales como espina de pescado, damero, etc.', 480);