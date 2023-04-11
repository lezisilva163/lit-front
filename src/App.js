import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';

import Routes from './Routes.js'

function App() {

  useEffect(() => {
    
  }, [])
  
  return(
    <div className='main-layer'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
