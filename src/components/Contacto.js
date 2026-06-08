// src/components/Contacto.js
import React from 'react';

const Contacto = () => {
  const contactos = [
    { nombre: 'Fernando Chiara Huanca', numero: '+591 79620124', whatsapp: '59179620124' },
    { nombre: 'Luis Diego Chiara Yapu', numero: '+591 74665929', whatsapp: '59174665929' }
  ];

  return (
    <section className="contacto" id="contacto">
      <div className="contenedor">
        <h2>Contacto directo</h2>
        <p>
          Para más información o para agendar una cita, puede contactarnos a través de los siguientes medios.
          Si desea contactarnos por WhatsApp, escríbanos a estos números:
        </p>
        <ul className="contactos-lista">
          {contactos.map((contacto, index) => (
            <li key={index}>
              <a href={`https://wa.me/${contacto.whatsapp}`} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                <i className="fi fi-brands-whatsapp">💬</i>
                <strong>{contacto.nombre}</strong><br />
                <span className="numero">{contacto.numero}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contacto;