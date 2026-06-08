// src/components/Trabajos.js
import React from 'react';

const Trabajos = () => {
  const trabajos = [
    { img: "/img/ejem1-1.jpg", desc: "Piso de parquet terminado en Quena Quena" },
    { img: "/img/ejem1-2.jpg", desc: "Acabado brillante en sala principal" },
    { img: "/img/ejem1-3.jpg", desc: "Instalación de parquet en departamento" },
    { img: "/img/ejem1-4.jpg", desc: "Cepillado y barnizado profesional" },
    { img: "/img/ejem2-1.jpg", desc: "trabajo en tarara rojo" },
    { img: "/img/ejem2-2.jpg", desc: "trabajo en tarara rojo" },
    { img: "/img/ejem2-3.jpg", desc: "como le da el barniz de tarara rojo" },
    { img: "/img/ejem2-4.jpg", desc: "acabado del tarara rojo" },
    { img: "/img/ejem3-1.jpg", desc: "la madera es tarara jaspeado" },
    { img: "/img/ejem3-2.jpg", desc: "como queda con el cepillado" },
    { img: "/img/ejem3-3.jpg", desc: "semi acabado del tarara jaspeado" },
    { img: "/img/ejem3-4.jpg", desc: "resultado final de tarara jaspeado" },
    { img: "/img/ejem4-1.jpg", desc: "restauracion en madera Kena kena" },
    { img: "/img/ejem4-2.jpg", desc: "volvemos a cepillar el piso" },
    { img: "/img/ejem4-3.jpg", desc: "como queda con el cepillado" },
    { img: "/img/ejem4-4.jpg", desc: "resultado final de Kena kena" },
    { img: "/img/ejem5-1.jpg", desc: "el cepillado del tarara amarillo" },
    { img: "/img/ejem5-2.jpg", desc: "primera mano de barnizado" },
    { img: "/img/ejem5-3.jpg", desc: "segunda mano de barnizado" },
    { img: "/img/ejem5-4.jpg", desc: "resultado final de tarara amarillo" }
  ];

  return (
    <section className="trabajos" id="trabajos">
      <div className="contenedor">
        <h2>Nuestras referencias de Trabajos Realizados</h2>
        <p>
          Realizamos con todo tipo de madera: Mara, Quena Quena, Tarara Rojo, Roble y otros,
          con resultados excelentes. Nuestros clientes quedan satisfechos con el resultado final.
        </p>
        <div className="galeria-referencias">
          {trabajos.map((trabajo, index) => (
            <div key={index} className="tarjeta-imagen">
              <img src={trabajo.img} alt={`Trabajo ${index + 1}`} className="img-referencia" />
              <p className="descripcion">{trabajo.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trabajos;