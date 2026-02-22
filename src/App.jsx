import { useState, useEffect, useLayoutEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import { NavLogo, FooterLogo } from "./components/Logo";
import LogoSlider from "./components/LogoSlider/LogoSlider";

//product
import aice from "./data/aice.json";
import campina from "./data/campina.json";
import gracia from "./data/gracia.json";
import korudo from "./data/korudo.json";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App() {

  const productNav = ["Semua", "Campina", "Aice", "Korudo", "Gracia"];
  const [stateProductNav, setStateProductNav] = useState("Semua");

  const product = [...aice, ...campina, ...gracia, ...korudo];
  
  const [visible, setVisible] = useState(10);
  const handleAddVisible = () => {
    setVisible((prev) => prev + 20);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // threshold mobile, bisa diubah
    };

    checkMobile(); // cek saat mount

    window.addEventListener("resize", checkMobile); // update saat resize
    return () => window.removeEventListener("resize", checkMobile); // cleanup
  }, []);

  const [search, setSearch] = useState("")

  const filtered = product.filter((item) => item.product.toLowerCase().includes((search || "").toLowerCase()))

  function formatNumber(value) {
    const number = Number(value);

    if (isNaN(number)) return "0";

    return number.toLocaleString("id-ID");
  }

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-container",
      content: "#smooth-wrapper",
      smooth: 2,
      effects: true
    });

    gsap.to("#img1", {
      x: isMobile ? -50 : -100,
      y: isMobile ? 100 : 300,
      ease: 0,
      scrollTrigger: {
        trigger: ".productCard",
        start: "top 70%",
        end: "+=300",
        scrub: 1,
      }
    })

    gsap.to("#img3", {
      y: isMobile ? -100 : -300,
      ease: 0,
      scrollTrigger: {
        trigger: ".aboutContainer",
        start: "top 70%",
        end: "+=300",
        scrub: 1,
      }
    })

    return () => {
      smoother.kill();
    };
  }, [isMobile]);

  return (
    <div id="smooth-container">
      <Navbar />
      <div className="container" id="smooth-wrapper">
        <img src="/ice/1.webp" alt="" className="slowImg" id="img1" loading="lazy"/>
        <div id="beranda" className="banner">
          <p className="title">
            Distributor Produk
            <br />
            <span className="span">Es Krim</span> Berkualitas
          </p>
          <p className="desc">
            Kami menyediakan dan mendistribusikan berbagai produk es krim
            berkualitas tinggi dengan sistem distribusi yang andal, tepat waktu, dan menjangkau berbagai
            sektor usaha.
          </p>
        </div>
        <div id="product" className="productContainer">
          <LogoSlider />
          <div className="productWrapper">
            <div className="topSection">
              <div className="titleContainer">
                <p className="title">Produk Kami</p>
                <div className="searchContainer">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0482 10.7933L14 13.9552L13.0248 15L10.0737 11.8374C8.9757 12.7805 7.60993 13.2935 6.20262 13.2913C2.77877 13.2913 0 10.3141 0 6.64566C0 2.97726 2.77877 0 6.20262 0C9.62646 0 12.4052 2.97726 12.4052 6.64566C12.4072 8.15349 11.9285 9.61682 11.0482 10.7933ZM9.66575 10.2454C10.5402 9.28156 11.0286 7.98984 11.0269 6.64566C11.0269 3.79024 8.86768 1.47681 6.20262 1.47681C3.53756 1.47681 1.37836 3.79024 1.37836 6.64566C1.37836 9.50108 3.53756 11.8145 6.20262 11.8145C7.45718 11.8164 8.66279 11.2931 9.56237 10.3562L9.66575 10.2454Z"
                      fill="#5996FD"
                    />
                  </svg>
                  <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Cari Produk" className="input" />
                </div>
              </div>
              <div className="productNavContainer">
                {productNav.map((item, idx) => (
                  <div
                    className={`productNav ${item === stateProductNav ? "active" : ""}`}
                    onClick={() => setStateProductNav(item)}
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <img src="/ice/2.webp" alt="" className="slowImg" id="img2" loading="lazy" data-speed="0.5"/>
            <div className="product">
              {filtered
                .filter(
                  (item) =>
                    stateProductNav === "Semua" ||
                  item.brand === stateProductNav,
                )
                .slice(0, visible)
                .map((item, idx) => (
                  <div className="productCard" key={idx}>
                    <img
                      className="productImg"
                      src={item.foto}
                      alt={item.product}
                      loading="lazy"
                    />
                    <div className="productTop">
                      <div>
                        <p className="productTitle">{item.product}</p>
                        <p style={{fontSize: isMobile ? "12px" : "1rem"}} className="productSmall">{item.brand}</p>
                      </div>
                      <div>
                        <p className="productSmall">Isi/dus</p>
                        <p style={{fontSize: isMobile ? "12px" : "1rem"}}>{item.isi}</p>
                      </div>
                    </div>
                    <div className="productBottom">
                      <div>
                        <p className="productSmall">Harga Ecer</p>
                        <p style={{fontSize: isMobile ? "12px" : "1rem", color: "#2aaae1"}}>{formatNumber(item.ecer)}</p>
                      </div>
                      <div>
                        <p className="productSmall">Harga Modal</p>
                        <p style={{fontSize: isMobile ? "12px" : "1rem", color: "#2aaae1"}}>{formatNumber(item.modal)}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {product.length > visible && (
            <div onClick={handleAddVisible} className="buttonContainer">
              <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.6823 0.730957L8.18231 7.73096L0.682312 0.730956" stroke="black" stroke-width="2"/>
              </svg>
              <p>Lihat Lebih Banyak</p>
            </div>
          )}
        </div>
        <div id="about" className="aboutContainer">
          <img src="/ice/4.webp" alt="" className="slowImg" id="img3" loading="lazy"/>
          <p className="title">
            <span className="titleWrapper">
              Tentang <span className="blue">Kami</span>
              <svg
                className="bgSvg"
                viewBox="0 0 242 42"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-2.33084e-05 41.8815C3.2932 39.5985 6.72108 37.5884 10.2837 35.6935C75.6522 3.7836 151.493 4.74638 220.22 20.722C224.038 21.6254 227.848 22.5814 231.716 23.6056C233.768 24.1496 235.926 23.8441 237.724 22.7161C239.522 21.5905 240.812 19.7347 241.303 17.5971C241.793 15.4595 241.441 13.2268 240.314 11.4301C239.187 9.63119 237.378 8.41562 235.294 8.01074C231.226 7.21413 227.222 6.48934 223.215 5.82001C151.085 -6.01258 73.3978 -1.46434 9.88541 34.9997C6.43468 37.1377 3.13441 39.3841 -2.33084e-05 41.8815Z"
                  fill="#FED6F0"
                />
              </svg>
            </span>
          </p>
          <p className="desc">
            CV. Prima Amanah adalah perusahaan yang berdiri pada tanggal 05
            februari 2020, cv prima amanah bergerak di bidang distribusi food
            (produk ice cream & sembako) dan pemasaran CV. Prima Amanah telah
            mencakupp di wilayah Lamping Tengah, Lampung Timur, Metro, Bandar
            Lampung, Pesawaran, dan Kalianda
          </p>
          <div className="aboutWrapper">
            <div className="about" style={{ backgroundColor: "#FED6F0" }}>
              <div className="aboutLeft">
                <div className="aboutTitle">
                  <p>Visi Perusahaan</p>
                </div>
                <p className="aboutDesc" style={{ color: "#303030" }}>
                  Menjadi distributor yang mampu mendistribusikan produk mitra
                  bisnis secara optimal dan tepat.
                </p>
              </div>
              <img className="aboutImg" src="/photo/left.svg" alt="kurir" />
            </div>
            <div className="about" style={{ backgroundColor: "#5996FD" }}>
              <div className="aboutLeft">
                <div className="aboutTitle">
                  <p>Misi Perusahaan</p>
                </div>
                <p className="aboutDesc" style={{ color: "white" }}>
                  Menjadi mitra pelanggan terpercaya dalam pengadaan produk dan
                  solusi distribusi unggul.
                </p>
              </div>
              <img className="aboutImg" src="/photo/right.svg" alt="kurir" />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="left">
            {!isMobile && <FooterLogo />}
            <div className="desc">
              <p style={{ fontSize: "24px"}}>
                Mitra Distribusi Produk Terpercaya dengan Jangkauan Wilayah yang
                Luas
              </p>
              <p style={{textAlign: "justify"}}>
                Berpengalaman dalam distribusi dan pemasaran produk ice cream
                serta sembako dengan cakupan Lampung Tengah, Lampung Timur,
                Metro, Bandar Lampung, Pesawaran, dan Kalianda sejak 2020.
              </p>
            </div>
          </div>
          <div className="center">
            <a style={{fontWeight: 700}} href="#beranda" className="navItem">
              Beranda
            </a>
            <a style={{fontWeight: 700}} href="#product" className="navItem">
              Produk
            </a>
            <a style={{fontWeight: 700}} href="#about" className="navItem">
              Tentang Kami
            </a>
          </div>
          <div className="right">
            <div style={{display: "flex", gap: "1rem"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11.45C11.2422 11.45 10.5155 11.1603 9.9797 10.6445C9.44388 10.1288 9.14286 9.42935 9.14286 8.7C9.14286 7.97065 9.44388 7.27118 9.9797 6.75546C10.5155 6.23973 11.2422 5.95 12 5.95C12.7578 5.95 13.4845 6.23973 14.0203 6.75546C14.5561 7.27118 14.8571 7.97065 14.8571 8.7C14.8571 9.06114 14.7832 9.41873 14.6397 9.75238C14.4961 10.086 14.2856 10.3892 14.0203 10.6445C13.755 10.8999 13.44 11.1025 13.0934 11.2407C12.7467 11.3789 12.3752 11.45 12 11.45ZM12 1C9.87827 1 7.84344 1.81125 6.34315 3.25528C4.84285 4.69931 4 6.65783 4 8.7C4 14.475 12 23 12 23C12 23 20 14.475 20 8.7C20 6.65783 19.1571 4.69931 17.6569 3.25528C16.1566 1.81125 14.1217 1 12 1Z" fill="white"/>
              </svg>
              <p>Yosodadi, Kec. Metro Timur, Kota Metro, Lampung 34124</p>
            </div>
            <div style={{display: "flex", gap: "1rem"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.24583 2.10646C8.81928 1.9415 9.43465 1.9689 9.9895 2.18411C10.5444 2.39932 11.0052 2.78934 11.2954 3.28926L11.3923 3.47556L12.2599 5.31478C12.5227 5.87313 12.6078 6.4928 12.5049 7.09692C12.4019 7.70103 12.1153 8.26302 11.6806 8.71316L11.5063 8.8782L10.1395 10.0948C9.89313 10.3173 10.0779 11.1788 10.969 12.6517C11.7711 13.977 12.4237 14.5959 12.7448 14.6297H12.8011L12.8706 14.6172L15.5571 13.8332C15.9181 13.7276 16.3035 13.7234 16.6669 13.8212C17.0304 13.919 17.3567 14.1146 17.6067 14.3846L17.726 14.5284L19.5043 16.879C19.8528 17.3397 20.0265 17.9 19.9967 18.4675C19.9669 19.035 19.7355 19.5758 19.3405 20.0011L19.1806 20.1586L18.4703 20.8013C17.8325 21.3776 17.0346 21.767 16.1716 21.9233C15.3085 22.0795 14.4166 21.996 13.6018 21.6827C11.066 20.7075 8.76217 18.4794 6.66931 15.021C4.57252 11.5539 3.70104 8.53186 4.09025 5.94369C4.20803 5.16133 4.5457 4.424 5.0674 3.81001C5.58911 3.19603 6.27536 2.72832 7.05328 2.45655L7.30621 2.37653L8.24583 2.10646Z" fill="white"/>
              </svg>
              <p>082184846969</p>
            </div>
            <div style={{display: "flex", gap: "1rem"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 6V12L16 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>
                Senin sampai Jumat: 08.00–17.00 Sabtu: 08.00–14.00 Minggu: Tutup
              </p>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem"}}>{isMobile && <FooterLogo />}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
