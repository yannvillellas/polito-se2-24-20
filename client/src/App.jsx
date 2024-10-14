import { useState, useEffect } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import AlertNotFound from './components/alerts/AlertNotFound';
import Home from './components/Home/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetTicket from './components/GetTicket/GetTicket';

import Officer from './components/Officer/Officer';


function App() {

  /*
  const [counterNumber, setCounterNumber]= useState(3);
  useEffect(()=>{
    const getNextCustomer = async ()=>{
      console.log("sono in App.jsx");
      const counterQueue=await nextCustomerAPI.getNextCustomer(counterNumber);
      console.log("sono in App.jsx");
      console.log(counterQueue);
    }
    getNextCustomer();
    // salva in Done_ticket il ticket servito e cancella il ticket dalla coda
  }, []);
  */






  return (
    <Routes>
      <Route path='/*' element={<AlertNotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/customer' element={<GetTicket/>}/>
      <Route path='/officer' element={<Officer/>}/>
    </Routes>
  )
}

export default App
