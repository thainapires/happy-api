import React from 'react';

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Landing(){
    return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>
        <main>
          <h1>Se uma palavra pode mudar tudo, imagina um livro!</h1>
          <p>Encontre as bibliotecas que estão mais próximas de você.</p>
        </main>

        <div className="location">
          <strong>Rio de Janeiro</strong>
          <span>RJ</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
        </Link>
      </div>
    </div>
    );
}

export default Landing;