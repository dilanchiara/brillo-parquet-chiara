// src/components/FigurasPiso.js
import React from 'react';

const FigurasPiso = () => {
  const figuras = [
    { img: "/img/MP1.jpeg", desc: "Piso en espiga clásico" },
    { img: "/img/MP2.jpeg", desc: "Diseño damero en parquet" },
    { img: "/img/MP3.jpeg", desc: "Figura chevrón terminada" },
    { img: "/img/MP4.jpeg", desc: "Diseño personalizado en piso" },
    { img: "/img/MP5.jpeg", desc: "Piso de parquet en zig zag" },
    { img: "/img/MP6.jpeg", desc: "Figura espina de pescado" },
    { img: "/img/MP7.jpeg", desc: "Combinación de figuras parquet" },
    { img: "/img/MP8.jpeg", desc: "Acabado de lujo en parquet" }
  ];

  return (
    <section className="figuraspiso" id="figuraspiso">
      <div className="contenedor">
        <h2>Figura de colocado de parquet</h2>
        <p>
          Realizamos figuras de parquet como espina de pescado, damero, zig zag, entre otros,
          con resultados excelentes y acabados profesionales.
        </p>
        <div className="galeria-figuras">
          {figuras.map((item, index) => (
            <div key={index} className="tarjeta-imagen">
              <img src={item.img} alt="Figuras de parquet" className="img-servicio" />
              <p className="descripcion">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FigurasPiso;