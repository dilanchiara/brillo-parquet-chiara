// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Trabajos from '../components/Trabajos';
import ArregloMuebles from '../components/ArregloMuebles';
import ColocadoPuertas from '../components/ColocadoPuertas';
import FigurasPiso from '../components/FigurasPiso';
import FormularioCita from '../components/FormularioCita';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';

const HomePage = () => {
  const scrollToSection = (seccion) => {
    const element = document.getElementById(seccion);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Header scrollToSection={scrollToSection} />
      <Hero />
      <Trabajos />
      <ArregloMuebles />
      <ColocadoPuertas />
      <FigurasPiso />
      <FormularioCita />
      <Contacto />
      <Footer />
    </main>
  );
};

export default HomePage;