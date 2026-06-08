// src/components/FormularioCita.js
import React, { useState } from 'react';

const FormularioCita = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    servicio: '',
    fecha: ''
  });

  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false); // ← NUEVO: estado para loading

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(formData.fecha);

    if (!formData.nombre) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.telefono) nuevosErrores.telefono = 'El teléfono es obligatorio';
    if (formData.telefono && !/^\d+$/.test(formData.telefono)) 
      nuevosErrores.telefono = 'El teléfono debe contener solo números';
    if (!formData.correo) nuevosErrores.correo = 'El correo es obligatorio';
    if (formData.correo && (!formData.correo.includes('@') || !formData.correo.includes('.'))) 
      nuevosErrores.correo = 'Ingrese un correo electrónico válido';
    if (!formData.servicio) nuevosErrores.servicio = 'Seleccione un servicio';
    if (!formData.fecha) nuevosErrores.fecha = 'La fecha es obligatoria';
    else if (fechaSeleccionada < hoy) nuevosErrores.fecha = 'La fecha no puede ser anterior al día de hoy';

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // ============================================
  // 🔄 handleSubmit MODIFICADO - Envía al BACKEND
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setEnviando(true); // ← NUEVO: deshabilitar botón mientras se envía

    try {
      // 📤 Enviar datos al backend (API Node.js)
      const response = await fetch('http://localhost:3001/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          correo: formData.correo,
          servicio: formData.servicio,
          fecha: formData.fecha,
          observaciones: '' // Campo opcional
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ✅ Éxito - Cita guardada en la base de datos
        alert(`✅ ¡Gracias ${formData.nombre}!\n\n✅ Su cita ha sido agendada para el ${formData.fecha}.\n📋 Servicio: ${formData.servicio}\n\n📞 Nos contactaremos para confirmar.`);
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          telefono: '',
          correo: '',
          servicio: '',
          fecha: ''
        });
      } else {
        // ❌ Error del backend
        const mensajeError = data.errors 
          ? data.errors.map(err => err.msg).join(', ')
          : (data.message || 'No se pudo agendar la cita');
        
        alert(`❌ Error: ${mensajeError}`);
      }
    } catch (error) {
      // ❌ Error de conexión (servidor no está corriendo)
      console.error('Error al enviar cita:', error);
      alert('❌ Error de conexión con el servidor.\n\nPor favor, verifica que el backend esté corriendo en http://localhost:3001\n\n🔄 Intenta nuevamente más tarde.');
    } finally {
      setEnviando(false); // ← NUEVO: habilitar botón nuevamente
    }
  };

  return (
    <section className="cita" id="cita">
      <div className="contenedor">
        <h2>Agendar una visita</h2>
        <p>
          Complete el siguiente formulario para que podamos contactarlo.<br />
          <small>Nos comunicaremos con usted para confirmar la visita y discutir los detalles del servicio.</small>
        </p>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo-formulario">
            <i className="fi fi-rs-user">👤</i>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              disabled={enviando} // ← NUEVO: deshabilitar mientras se envía
            />
          </div>
          {errors.nombre && <small style={{ color: 'red' }}>{errors.nombre}</small>}

          <div className="campo-formulario">
            <i className="fi fi-rs-phone-call">📞</i>
            <input
              type="text"
              id="telefono"
              placeholder="Teléfono / WhatsApp"
              value={formData.telefono}
              onChange={handleChange}
              disabled={enviando} // ← NUEVO
            />
          </div>
          {errors.telefono && <small style={{ color: 'red' }}>{errors.telefono}</small>}

          <div className="campo-formulario">
            <i className="fi fi-rs-envelope">✉️</i>
            <input
              type="email"
              id="correo"
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChange={handleChange}
              disabled={enviando} // ← NUEVO
            />
          </div>
          {errors.correo && <small style={{ color: 'red' }}>{errors.correo}</small>}

          <div className="campo-formulario">
            <i className="fi fi-rs-brush">🖌️</i>
            <select 
              id="servicio" 
              value={formData.servicio} 
              onChange={handleChange}
              disabled={enviando} // ← NUEVO
            >
              <option value="">Seleccione un servicio</option>
              <option value="Colocado, Cepillado y Barnizado">Colocado, Cepillado y Barnizado</option>
              <option value="Restauración de Muebles">Restauración de Muebles</option>
              <option value="Colocado de Puertas y Arreglos">Colocado de Puertas y Arreglos</option>
              <option value="Figura de Colocado de Parquet">Figura de Colocado de Parquet</option>
            </select>
          </div>
          {errors.servicio && <small style={{ color: 'red' }}>{errors.servicio}</small>}

          <div className="campo-formulario">
            <i className="fi fi-rs-calendar">📅</i>
            <input
              type="date"
              id="fecha"
              value={formData.fecha}
              onChange={handleChange}
              disabled={enviando} // ← NUEVO
            />
          </div>
          {errors.fecha && <small style={{ color: 'red' }}>{errors.fecha}</small>}

          <input 
            className="boton" 
            type="submit" 
            value={enviando ? "⏳ Enviando..." : "Agendar cita"} // ← NUEVO: texto dinámico
            disabled={enviando} // ← NUEVO: deshabilitar mientras se envía
          />
        </form>
      </div>
    </section>
  );
};

export default FormularioCita;