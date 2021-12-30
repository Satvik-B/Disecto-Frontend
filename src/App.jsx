// import logo from './logo.svg';
import './App.css';
// import UploadCollection from './components/UploadCollection';
import React from 'react';
import MainRouter from './routers/MainRouter';

function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: 'rgba(208, 226, 255, 0.2)', minHeight:'100vh' }}>
        <div style={{ backgroundColor: 'rgba(243, 243, 243, 1)', minHeight:'100vh' }}>
          <MainRouter />
        </div>
      </div>
    </div>
  );
}

export default App;
