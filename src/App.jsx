import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Navbar from "./components/Navbar";
import { NavLogo, FooterLogo } from "./components/Logo";
import LogoSlider from "./components/LogoSlider/LogoSlider";

//product
import aice from "./data/aice.json";
import campina from "./data/campina.json";
import gracia from "./data/gracia.json";
import korudo from "./data/korudo.json";

gsap.registerPlugin(ScrollSmoother);

function App() {
  // useEffect(() => {
  //   ScrollSmoother.create({
  //     wrapper: "#smooth-wrapper",
  //     content: "#smooth-content",
  //     smooth: 1.2,
  //     effects: true,
  //   });
  // }, []);

  const productNav = ["Semua", "Campina", "Aice", "Korudo", "Gracia"];
  const [stateProductNav, setStateProductNav] = useState("Semua");

  const product = [...aice, ...campina, ...gracia, ...korudo];

  const [visible, setVisible] = useState(10);
  const handleAddVisible = () => {
    setVisible((prev) => prev + 20);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div id="beranda" className="banner">
          <p className="title">
            Distributor Produk
            <br />
            <span className="span">Es Krim</span> Berkualitas
          </p>
          <p className="desc">
            Kami menyediakan dan mendistribusikan berbagai produk es krim
            berkualitas tinggi dengan
            <br />
            sistem distribusi yang andal, tepat waktu, dan menjangkau berbagai
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
                  <p>Lihat Semua</p>
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
            <div className="product">
              {product
                .slice(0, visible)
                .filter(
                  (item) =>
                    stateProductNav === "Semua" ||
                    item.brand === stateProductNav,
                )
                .map((item, idx) => (
                  <div className="productCard" key={idx}>
                    <img
                      className="productImg"
                      src={item.foto}
                      alt={item.product}
                    />
                    <div className="productTop">
                      <div>
                        <p className="productTitle">{item.product}</p>
                        <p className="productSmall">{item.brand}</p>
                      </div>
                      <div>
                        <p className="productSmall">Isi/dus</p>
                        <p>{item.isi}</p>
                      </div>
                    </div>
                    <div className="productBottom">
                      <div>
                        <p className="productSmall">Harga Ecer</p>
                        <p>{item.ecer}</p>
                      </div>
                      <div>
                        <p className="productSmall">Harga Modal</p>
                        <p>{item.modal}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {product.length > visible && (
            <div onClick={handleAddVisible} className="buttonContainer">
              <p>Lihat Lebih Banyak</p>
            </div>
          )}
        </div>
        <div id="about" className="aboutContainer">
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
                  <p>Visi Perusahaan</p>
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
            <FooterLogo />
            <div className="desc">
              <p style={{ fontSize: "24px" }}>
                Mitra Distribusi Produk Terpercaya dengan Jangkauan Wilayah yang
                Luas
              </p>
              <p>
                Berpengalaman dalam distribusi dan pemasaran produk ice cream
                serta sembako dengan cakupan Lampung Tengah, Lampung Timur,
                Metro, Bandar Lampung, Pesawaran, dan Kalianda sejak 2020.
              </p>
            </div>
          </div>
          <div className="center">
            <a href="#beranda" className="navItem">
              Beranda
            </a>
            <a href="#product" className="navItem">
              Produk
            </a>
            <a href="#about" className="navItem">
              Tentang Kami
            </a>
          </div>
          <div className="right">
            <p>Yosodadi, Kec. Metro Timur, Kota Metro, Lampung 34124</p>
            <p>082184846969</p>
            <p>
              Senin sampai Jumat: 08.00–17.00 Sabtu: 08.00–14.00 Minggu: Tutup
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
