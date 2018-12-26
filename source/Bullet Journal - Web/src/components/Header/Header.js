import React, { Component } from 'react';

import './index.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header pure-menu pure-menu-horizontal pure-menu-fixed">
        <ul>
        <li><a href="/">Dia</a></li>
        <li><a href="/">Semana</a></li>
        <li><a href="/">Mês</a></li>
        <li><a href="/">Ano</a></li>
        <li><a href="/">Configurações</a></li>
    </ul>
      </div>
    );
  }
}