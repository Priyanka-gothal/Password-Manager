import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
    <>
    <Navbar />
    <Manager />
    <Footer />
     
    </>
  )
}

export default App
