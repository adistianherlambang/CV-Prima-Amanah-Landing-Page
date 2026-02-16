import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Navbar from './components/Navbar'
import {NavLogo, FooterLogo} from "./components/Logo"
import LogoSlider from './components/LogoSlider/LogoSlider';

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

  const product = ["Semua", "Campina", "Aice", "Korudo", "Gracia"]
  const [productNav, setProductNav] = useState("Semua")

  return (
    <>
    <Navbar/>
    <div className='container'>
      <div id='beranda' className='banner'>
        <p className='title'>
          Distributor Produk
          <br/><span className='span'>Es Krim</span> Berkualitas
        </p>
        <p className='desc'>
          Kami menyediakan dan mendistribusikan berbagai produk es krim berkualitas tinggi dengan
          <br/>sistem distribusi yang andal, tepat waktu, dan menjangkau berbagai sektor usaha.
        </p>
      </div>
      <div id='product' className='productContainer'>
        <LogoSlider/>
        <div className="productWrapper">
          <div className='topSection'>
            <div className='titleContainer'>
              <p className='title'>Produk Kami</p>
              <div className='searchContainer'>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.0482 10.7933L14 13.9552L13.0248 15L10.0737 11.8374C8.9757 12.7805 7.60993 13.2935 6.20262 13.2913C2.77877 13.2913 0 10.3141 0 6.64566C0 2.97726 2.77877 0 6.20262 0C9.62646 0 12.4052 2.97726 12.4052 6.64566C12.4072 8.15349 11.9285 9.61682 11.0482 10.7933ZM9.66575 10.2454C10.5402 9.28156 11.0286 7.98984 11.0269 6.64566C11.0269 3.79024 8.86768 1.47681 6.20262 1.47681C3.53756 1.47681 1.37836 3.79024 1.37836 6.64566C1.37836 9.50108 3.53756 11.8145 6.20262 11.8145C7.45718 11.8164 8.66279 11.2931 9.56237 10.3562L9.66575 10.2454Z" fill="#5996FD"/>
                </svg>
                <p>Lihat Semua</p>
              </div>
            </div>
            <div className='productNavContainer'>
              {product.map((item, idx) => (
                <div
                  className={`productNav ${item === productNav ? "active" : ""}`}
                  onClick={() => setProductNav(item)}
                  key={idx}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
