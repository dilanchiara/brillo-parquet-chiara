// src/components/ColocadoPuertas.js
import React from 'react';

const ColocadoPuertas = () => {
  const puertas = [
    { img: "/img/COLOCADOPUERTA1.jpeg", desc: "Instalación de puerta principal" },
    { img: "/img/COLOCADOPUERTA2.jpeg", desc: "Colocación de puerta interior" },
    { img: "/img/COLOCADOPUERTA3.jpeg", desc: "Ajuste de puerta de roble" },
    { img: "/img/COLOCADOPUERTA4.jpeg", desc: "Instalación de puerta corrediza" },
    { img: "/img/COLOCADOPUERTA5.jpeg", desc: "Colocación de marco y puerta" },
    { img: "/img/COLOCADOPUERTA6.jpeg", desc: "Puerta de madera maciza instalada" }
  ];

  return (
    <section className="colocadopuertas" id="colocadopuertas">
      <div className="contenedor">
        <h2>Servicio de Colgado de puertas y restauracion</h2>
        <p>
          Instalamos y colocamos puertas de madera con precisión y acabado profesional.
          Aseguramos un ajuste perfecto, herrajes de calidad y durabilidad en cada instalación.
        </p>
        <div className="galeria-puertas">
          {puertas.map((item, index) => (
            <div key={index} className="tarjeta-imagen">
              <img src={item.img} alt="Colocado de puertas" className="img-servicio" />
              <p className="descripcion">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColocadoPuertas;