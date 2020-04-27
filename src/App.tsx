import React from 'react';
import './assets/styles/styles.scss';
import Header from './app/components/header';
import Home from './app/home';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
