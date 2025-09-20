// Importa o React, necessário para criar componentes React
import React from 'react';

// Importa o ReactDOM para renderizar a aplicação na árvore DOM do navegador
import ReactDOM from 'react-dom/client';

// Importa o arquivo de estilos global da aplicação
import './index.css';

// Importa o componente principal da aplicação
import App from './App';

// Cria a raiz da aplicação, apontando para o elemento HTML com id 'root'
// Esse é o ponto de entrada da aplicação no DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação dentro do React.StrictMode
// React.StrictMode ajuda a identificar problemas no código durante o desenvolvimento
root.render(
  <React.StrictMode>
    <App /> {/* Componente principal da aplicação */}
  </React.StrictMode>
);
