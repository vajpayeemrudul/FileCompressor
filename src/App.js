import React from 'react';
import {Routes,Route,Redirect} from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.css';
import Upload from './Components/Upload/Upload';

function App() {
  return (
    <div className="App">
      <Header/>
      <Upload/>
    </div>
  );
}
export default App;
