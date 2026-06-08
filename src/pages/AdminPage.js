import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [citas, setCitas] = useState([]);
  const [citasFiltradas, setCitasFiltradas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [citaEditando, setCitaEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [notificacion, setNotificacion] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(false); // ← NUEVO: estado de carga

  // ============================================
  // 🔧 CONFIGURACIÓN DE LA API
  // ============================================
  const API_URL = 'http://localhost:3001/api/citas';

  // ============================================
  // 📥 CARGAR CITAS DESDE EL BACKEND
  // ============================================
  const cargarCitas = async () => {
    setCargando(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        setCitas(data.data);
        setCitasFiltradas(data.data);
      } else {
        console.error('Error al cargar citas:', data.message);
        mostrarNotificacion('⚠️ Error al cargar las citas');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      mostrarNotificacion('❌ Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  // ============================================
  // 🔐 AUTENTICACIÓN
  // ============================================
  useEffect(() => {
    const usuario = prompt("Ingrese usuario:");
    const contraseña = prompt("Ingrese contraseña:");

    if (usuario === "dilan" && contraseña === "2005") {
      setAutenticado(true);
      cargarCitas(); // ← MODIFICADO: carga desde backend, no localStorage
    } else {
      alert("⛔ Acceso denegado");
      window.location.href = "/";
    }
  }, []);

  // ============================================
  // 🔄 APLICAR FILTROS
  // ============================================
  const aplicarFiltros = () => {
    let filtradas = [...citas];

    if (filtroEstado !== 'todos') {
      filtradas = filtradas.filter(cita => cita.estado === filtroEstado);
    }

    if (busqueda) {
      filtradas = filtradas.filter(cita =>
        cita.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cita.telefono.includes(busqueda) ||
        cita.correo.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setCitasFiltradas(filtradas);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtroEstado, busqueda, citas]);

  // ============================================
  // 📅 FORMATEAR FECHA
  // ============================================
  const formatearFecha = (fecha) => {
    if (!fecha) return 'No especificada';
    try {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return fecha;
    }
  };

  // ============================================
  // ✅ CAMBIAR ESTADO DE CITA (EN BACKEND)
  // ============================================
  const cambiarEstado = async (id, nuevoEstado) => {
    if (!id) {
      mostrarNotificacion('❌ Error: ID de cita no válido');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      const data = await response.json();

      if (data.success) {
        mostrarNotificacion(`✅ Cita ${nuevoEstado.toLowerCase()}`);
        cargarCitas(); // Recargar lista actualizada
      } else {
        mostrarNotificacion(`❌ Error: ${data.message || 'No se pudo cambiar el estado'}`);
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      mostrarNotificacion('❌ Error de conexión con el servidor');
    }
  };

  // ============================================
  // 🗑️ ELIMINAR CITA (EN BACKEND)
  // ============================================
  const eliminarCitaHandler = async (id) => {
    if (!id) {
      mostrarNotificacion('❌ Error: ID de cita no válido');
      return;
    }

    const citaActual = citas.find(c => c.id_cita === id);
    const nombreCita = citaActual?.nombre || 'La cita';

    if (window.confirm(`¿Estás seguro de eliminar la cita de ${nombreCita}?`)) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          mostrarNotificacion(`✅ ${nombreCita} eliminado correctamente`);
          cargarCitas(); // Recargar lista actualizada
        } else {
          mostrarNotificacion(`❌ Error: ${data.message || 'No se pudo eliminar'}`);
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        mostrarNotificacion('❌ Error de conexión con el servidor');
      }
    }
  };

  // ============================================
  // 🗑️ ELIMINAR TODAS LAS CITAS
  // ============================================
  const eliminarTodasHandler = async () => {
    if (window.confirm('⚠️ ¿Estás seguro de eliminar TODAS las citas? Esta acción no se puede deshacer.')) {
      setCargando(true);
      let eliminadas = 0;
      let errores = 0;

      for (const cita of citas) {
        try {
          const response = await fetch(`${API_URL}/${cita.id_cita}`, {
            method: 'DELETE'
          });
          const data = await response.json();
          if (data.success) {
            eliminadas++;
          } else {
            errores++;
          }
        } catch (error) {
          errores++;
        }
      }

      mostrarNotificacion(`🗑️ Se eliminaron ${eliminadas} citas${errores > 0 ? `, ${errores} errores` : ''}`);
      cargarCitas(); // Recargar lista actualizada
      setCargando(false);
    }
  };

  // ============================================
  // ✏️ EDITAR CITA (EN BACKEND)
  // ============================================
  const editarCita = (cita) => {
    setCitaEditando({
      id_cita: cita.id_cita,
      nombre: cita.nombre,
      telefono: cita.telefono,
      correo: cita.correo,
      servicio: cita.servicio,
      fecha: cita.fecha
    });
    setMostrarModal(true);
  };

  // ============================================
  // 💾 GUARDAR EDICIÓN (EN BACKEND)
  // ============================================
  const guardarEdicion = async () => {
    if (!citaEditando) return;

    if (!citaEditando.nombre || !citaEditando.telefono || !citaEditando.correo || !citaEditando.fecha) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setCargando(true);

    try {
      const response = await fetch(`${API_URL}/${citaEditando.id_cita}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: citaEditando.nombre,
          telefono: citaEditando.telefono,
          correo: citaEditando.correo,
          servicio: citaEditando.servicio,
          fecha: citaEditando.fecha,
          observaciones: ''
        })
      });

      const data = await response.json();

      if (data.success) {
        mostrarNotificacion('✏️ Cita actualizada correctamente');
        setMostrarModal(false);
        setCitaEditando(null);
        cargarCitas(); // Recargar lista actualizada
      } else {
        mostrarNotificacion(`❌ Error: ${data.message || 'No se pudo actualizar'}`);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      mostrarNotificacion('❌ Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  // ============================================
  // 🔔 MOSTRAR NOTIFICACIÓN
  // ============================================
  const mostrarNotificacion = (mensaje) => {
    setNotificacion(mensaje);
    setTimeout(() => setNotificacion(''), 2000);
  };

  // ============================================
  // 📊 ORDENAR POR CAMPO
  // ============================================
  const ordenarPor = (campo) => {
    const citasOrdenadas = [...citasFiltradas];
    citasOrdenadas.sort((a, b) => {
      let valorA = a[campo] || '';
      let valorB = b[campo] || '';
      return valorA > valorB ? 1 : -1;
    });
    setCitasFiltradas(citasOrdenadas);
  };

  // ============================================
  // 📤 EXPORTAR A CSV (NUEVA FUNCIÓN)
  // ============================================
  const exportarCSV = () => {
    if (citasFiltradas.length === 0) {
      alert('No hay citas para exportar');
      return;
    }

    const headers = ['ID', 'Nombre', 'Teléfono', 'Correo', 'Servicio', 'Fecha', 'Estado', 'Fecha Registro'];
    const csvData = citasFiltradas.map(cita => [
      cita.id_cita,
      cita.nombre,
      cita.telefono,
      cita.correo,
      cita.servicio,
      cita.fecha,
      cita.estado,
      new Date(cita.fecha_registro).toLocaleString()
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'citas_exportadas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    mostrarNotificacion('📁 Citas exportadas a CSV');
  };

  // ============================================
  // 🔄 SINCRONIZAR (ACTUALIZAR DATOS)
  // ============================================
  const sincronizar = () => {
    cargarCitas();
    mostrarNotificacion('🔄 Sincronizando datos...');
  };

  // ============================================
  // 🎨 RENDERIZADO
  // ============================================
  if (!autenticado) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Verificando autenticación...</div>;
  }

  return (
    <div className="admin-container">
      <h1>Panel de Administración - Brillo & Parquet Chiara</h1>

      {/* Barra de herramientas */}
      <div className="barra-herramientas">
        <input
          type="text"
          className="buscar-input"
          placeholder="🔍 Buscar por nombre, teléfono o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn-pendiente" onClick={() => setFiltroEstado('Pendiente')}>⏳ Pendientes</button>
        <button className="btn-confirmada" onClick={() => setFiltroEstado('Confirmada')}>✅ Confirmadas</button>
        <button className="btn-cancelada" onClick={() => setFiltroEstado('Cancelada')}>❌ Canceladas</button>
        <button onClick={() => setFiltroEstado('todos')}>📋 Todas</button>
        <button className="btn-exportar" onClick={exportarCSV}>📥 Exportar CSV</button>
        <button className="btn-sincronizar" onClick={sincronizar}>🔄 Sincronizar</button>
        <button className="btn-eliminar-todas" onClick={eliminarTodasHandler}>🗑️ Eliminar todas</button>
      </div>

      <h2>
        Citas Agendadas 
        <span className="contador">({citasFiltradas.length})</span>
        {cargando && <span style={{ marginLeft: '10px', fontSize: '14px' }}>⏳ Cargando...</span>}
      </h2>

      {/* Tabla de citas */}
      {cargando && citas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>⏳ Cargando citas desde el servidor...</p>
        </div>
      ) : (
        <table className="tabla-citas">
          <thead>
            <tr>
              <th onClick={() => ordenarPor('id_cita')}>ID ⬍</th>
              <th onClick={() => ordenarPor('nombre')}>Nombre ⬍</th>
              <th onClick={() => ordenarPor('telefono')}>Teléfono ⬍</th>
              <th onClick={() => ordenarPor('correo')}>Correo ⬍</th>
              <th onClick={() => ordenarPor('servicio')}>Servicio ⬍</th>
              <th onClick={() => ordenarPor('fecha')}>Fecha ⬍</th>
              <th onClick={() => ordenarPor('estado')}>Estado ⬍</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  {busqueda || filtroEstado !== 'todos' 
                    ? '🔍 No hay citas que coincidan con los filtros'
                    : '📭 No hay citas agendadas'}
                </td>
              </tr>
            ) : (
              citasFiltradas.map((cita) => {
                const estadoClass = cita.estado === 'Confirmada' ? 'confirmada' : 
                                   (cita.estado === 'Cancelada' ? 'cancelada' : 'pendiente');
                return (
                  <tr key={cita.id_cita} className={estadoClass}>
                    <td>{cita.id_cita}</td>
                    <td>{cita.nombre || 'N/E'}</td>
                    <td>{cita.telefono || 'N/E'}</td>
                    <td>{cita.correo || 'N/E'}</td>
                    <td>{cita.servicio || 'No especificado'}</td>
                    <td>{formatearFecha(cita.fecha)}</td>
                    <td><strong>{cita.estado || 'Pendiente'}</strong></td>
                    <td>
                      <button 
                        className="btn-confirmar" 
                        onClick={() => cambiarEstado(cita.id_cita, 'Confirmada')}
                        disabled={cargando}
                      >
                        ✅ Confirmar
                      </button>
                      <button 
                        className="btn-cancelar" 
                        onClick={() => cambiarEstado(cita.id_cita, 'Cancelada')}
                        disabled={cargando}
                      >
                        ❌ Cancelar
                      </button>
                      <button 
                        className="btn-editar" 
                        onClick={() => editarCita(cita)}
                        disabled={cargando}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className="btn-eliminar" 
                        onClick={() => eliminarCitaHandler(cita.id_cita)}
                        disabled={cargando}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}

      {/* Modal de edición */}
      {mostrarModal && citaEditando && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Editar Cita #{citaEditando.id_cita}</h3>
            <input 
              type="text" 
              placeholder="Nombre" 
              value={citaEditando.nombre}
              onChange={(e) => setCitaEditando({...citaEditando, nombre: e.target.value})}
              disabled={cargando}
            />
            <input 
              type="text" 
              placeholder="Teléfono" 
              value={citaEditando.telefono}
              onChange={(e) => setCitaEditando({...citaEditando, telefono: e.target.value})}
              disabled={cargando}
            />
            <input 
              type="email" 
              placeholder="Correo" 
              value={citaEditando.correo}
              onChange={(e) => setCitaEditando({...citaEditando, correo: e.target.value})}
              disabled={cargando}
            />
            <select
              value={citaEditando.servicio}
              onChange={(e) => setCitaEditando({...citaEditando, servicio: e.target.value})}
              disabled={cargando}
            >
              <option value="Colocado, Cepillado y Barnizado">Colocado, Cepillado y Barnizado</option>
              <option value="Restauración de Muebles">Restauración de Muebles</option>
              <option value="Colocado de Puertas y Arreglos">Colocado de Puertas y Arreglos</option>
              <option value="Figura de Colocado de Parquet">Figura de Colocado de Parquet</option>
            </select>
            <input 
              type="date" 
              value={citaEditando.fecha}
              onChange={(e) => setCitaEditando({...citaEditando, fecha: e.target.value})}
              disabled={cargando}
            />
            <br /><br />
            <button onClick={guardarEdicion} disabled={cargando}>
              {cargando ? '⏳ Guardando...' : '💾 Guardar'}
            </button>
            <button onClick={() => { setMostrarModal(false); setCitaEditando(null); }} disabled={cargando}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Notificación flotante */}
      {notificacion && (
        <div className="notificacion">
          {notificacion}
        </div>
      )}
    </div>
  );
};

export default AdminPage;