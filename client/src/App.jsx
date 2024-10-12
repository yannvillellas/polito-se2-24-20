import { useState, useEffect } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import AlertNotFound from './components/alerts/AlertNotFound';
import Home from './components/Home/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetTicket from './components/GetTicket/GetTicket';
import Statistics from './components/Statistics/Statistics'
import statisticsAPI from './API/statisticsAPI';

function App() {

  // Mi serve per testare il fetch per le statistiche
  const [stats2D, setStats2D]= useState([]);
  useEffect(()=>{
    const getStats2D = async ()=>{
      console.log("sono in App.jsx");
      const stats2D=await statisticsAPI.stats2Dday('08/07/2024', '20/10/2024');
      setStats2D(stats2D);
    }
    getStats2D();
    console.log(stats2D);
  }, []);





  return (
    <Routes>
      <Route path='/*' element={<AlertNotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/customer' element={<GetTicket/>}/>
      <Route path='/manager' element={<Statistics/>}/>
    </Routes>
  )
}

export default App
