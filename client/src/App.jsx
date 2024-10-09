import { useState, useEffect } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import AlertNotFound from './components/alerts/AlertNotFound';
import Home from './components/Home/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetTicket from './components/GetTicket/GetTicket';


function App() {

  return (
    <Routes>
      <Route path='/*' element={<AlertNotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/customer' element={<GetTicket/>}/>
    </Routes>
  )
}

export default App
