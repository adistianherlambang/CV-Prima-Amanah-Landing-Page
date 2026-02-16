import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

import {NavLogo, FooterLogo} from "./components/Logo"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Navbar/>
    <div className='banner'>

    </div>
    <section id="beranda" style={{ height: "100vh", paddingTop: "100px" }}>
        Beranda
      </section>

      <section id="product" style={{ height: "100vh" }}>
        Product
      </section>

      <section id="about" style={{ height: "100vh" }}>
        About
      </section>
    </>
  )
}

export default App
