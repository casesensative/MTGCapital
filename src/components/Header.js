import React from 'react';
import logo from '../images/mtgcap-logo-fixed.png';

export default function Header() {

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="MTGCapital Logo" className="logo"/>
      </div>
      <div className="headerspace"></div>
      <div className="navigation">
        <ul className="navlinks">
          <li className="link">Home</li>
          <li className="link">CardCollection</li>
          <li className="link">Selling History</li>
        </ul>
      </div>
    </header>
  )
}