// src/components/ArregloMuebles.js
import React from 'react';

const ArregloMuebles = () => {
  const muebles = [
    { img: "/img/ARRM1.jpeg", desc: "Restauración completa de britina" },
    { img: "/img/ARRM2.jpeg", desc: "Reparación de britina de madera con ventanas de vidrio" },
    { img: "/img/ARRM3.jpeg", desc: "Lijado y barnizado de ropero" },
    { img: "/img/ARRM4.jpg", desc: "Restauración de ropero vintage" },
    { img: "/img/ARRM5.jpg", desc: "Acabado profesional en mueble" }
  ];

  return (
    <section className="arrglomuebles" id="arrglomuebles">
      <div className="contenedor">
        <h2>Servicio de Restauración de muebles</h2>
        <p>
          Restauramos muebles antiguos y dañados, dejándolos como nuevos con acabados profesionales.
          Somos expertos en la restauración de muebles de todo tipo de madera.
        </p>
        <div className="galeria-arrglos">
          {muebles.map((item, index) => (
            <div key={index} className="tarjeta-imagen">
              <img src={item.img} alt="Restauración de muebles" className="img-servicio" />
              <p className="descripcion">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArregloMuebles;