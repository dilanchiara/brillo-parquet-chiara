import { body } from 'express-validator';

export const validarCita = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres')
        .trim()
        .escape(),
    
    body('telefono')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isLength({ min: 8, max: 20 }).withMessage('Teléfono inválido')
        .matches(/^\d+$/).withMessage('El teléfono solo debe contener números')
        .trim(),
    
    body('correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Correo electrónico inválido')
        .normalizeEmail()
        .isLength({ max: 100 }).withMessage('Correo demasiado largo'),
    
    body('servicio')
        .notEmpty().withMessage('El servicio es obligatorio')
        .isIn([
            'Colocado, Cepillado y Barnizado',
            'Restauración de Muebles',
            'Colocado de Puertas y Arreglos',
            'Figura de Colocado de Parquet'
        ]).withMessage('Servicio no válido'),
    
    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .isISO8601().withMessage('Formato de fecha inválido')
        .custom((value) => {
            const fecha = new Date(value);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (fecha < hoy) {
                throw new Error('La fecha no puede ser anterior al día de hoy');
            }
            return true;
        }),
    
    body('observaciones')
        .optional()
        .isLength({ max: 500 }).withMessage('Las observaciones no pueden exceder 500 caracteres')
        .trim()
        .escape()
];

export const validarActualizacionEstado = [
    body('estado')
        .notEmpty().withMessage('El estado es obligatorio')
        .isIn(['Pendiente', 'Confirmada', 'Cancelada', 'Completada'])
        .withMessage('Estado no válido')
];