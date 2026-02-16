import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Navbar from './components/Navbar'
import {NavLogo, FooterLogo} from "./components/Logo"

gsap.registerPlugin(ScrollSmoother);

function App() {


  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true
    });
  }, []);

  return (
    <>
    <Navbar/>
    <div id='beranda' className='banner'>
      <p>
        Distributor Produk
        <br/><span className='span'>Es Krim</span> Berkualitas
      </p>
    </div>
    </>
  )
}

export default App
