import React, { useState } from 'react';

const Header = ({ scrollToSection }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const menuItems = [
    { id: 'trabajos', nombre: 'TRABAJOS EN COLOCADO,CEPILLADO Y BARNIZADO' },
    { id: 'arrglomuebles', nombre: 'ARREGLO DE MUEBLES' },
    { id: 'colocadopuertas', nombre: 'COLOCADO DE PUERTAS Y ARREGLOS' },
    { id: 'figuraspiso', nombre: 'FIGURAS DE PARQUET' },
    { id: 'cita', nombre: 'AGENDAR VISITA' },
    { id: 'contacto', nombre: 'CONTACTO' }
  ];

  return (
    <header className="header">
      <div className="contenedor">
        <nav className="menu">
          <div className="logo">
            <h1>Brillo & Parquet Chiara</h1>
            <span className="slogan">Calidad en colocado</span>
          </div>
          
          <ul className={`nav-links ${menuAbierto ? 'active' : ''}`}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <a onClick={() => scrollToSection(item.id)}>
                  {item.nombre}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
            <i className="fi fi-br-menu-burger">☰</i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;