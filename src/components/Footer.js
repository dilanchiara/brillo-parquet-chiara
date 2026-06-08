// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contenedor footer-contenido">
        <div className="footer-columna">
          <h3>Brillo & Parquet Chiara</h3>
          <p>Expertos en pisos de madera y restauración en La Paz - Bolivia.</p>
        </div>

        <div className="footer-columna">
          <h4>Síguenos y contacta</h4>
          <div className="redes-sociales">
            <a href="https://wa.me/message/Z5QOY6VAHYSG1" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
              📱 WhatsApp
            </a>
            <a href="https://www.facebook.com/share/16kMTz5jzw/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
              📘 Facebook
            </a>
          </div>
          <p className="footer-aviso">¡Escríbenos! Respondemos rápido.</p>
        </div>

        <div className="footer-columna">
          <h4>Horario de atención</h4>
          <p>Lun - Vie: 8:00 am - 6:00 pm<br />
            Sábados: 9:00 am - 1:00 pm</p>
          <p>La Paz, Bolivia</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="contenedor">
          <p>&copy; 2026 Brillo & Parquet Chiara - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;