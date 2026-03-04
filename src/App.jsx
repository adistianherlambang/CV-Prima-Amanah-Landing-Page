import { useState, useEffect, useLayoutEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Navbar from "./components/Navbar";
import { NavLogo, FooterLogo } from "./components/Logo";
import LogoSlider from "./components/LogoSlider/LogoSlider";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import Image from "./components/Image/Image";

//product
import aice from "./data/aice.json";
import campina from "./data/campina.json";
import gracia from "./data/gracia.json";
import korudo from "./data/korudo.json";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

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

  const [search, setSearch] = useState("");

  const filtered = product.filter((item) =>
    item.product.toLowerCase().includes((search || "").toLowerCase()),
  );

  function formatNumber(value) {
    const number = Number(value);

    if (isNaN(number)) return "0";

    return number.toLocaleString("id-ID");
  }

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-container",
      content: "#smooth-wrapper",
      smooth: 1,
      effects: true,
    });

    // intercept hash links and drive them through the smoother
    const clickHandler = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          smoother.scrollTo(target, { offsetY: 0, ease: "power2.inOut" });
        }
      }
    };

    const anchors = document.querySelectorAll("#smooth-wrapper a[href^='#']");
    anchors.forEach((a) => a.addEventListener("click", clickHandler));

    gsap.to("#img1", {
      x: isMobile ? -50 : -100,
      y: isMobile ? 100 : 300,
      ease: 0,
      scrollTrigger: {
        trigger: ".productCard",
        start: "top 70%",
        end: "+=300",
        scrub: 1,
      },
    });

    gsap.to("#img3", {
      y: isMobile ? -100 : -300,
      ease: 0,
      scrollTrigger: {
        trigger: ".aboutContainer",
        start: "top 70%",
        end: "+=300",
        scrub: 1,
      },
    });

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", clickHandler));
      smoother.kill();
    };
  }, [isMobile]);

  return (
    <div id="smooth-container">
      <Navbar />
      <div className="container" id="smooth-wrapper">
        <img
          src="/ice/1.webp"
          alt=""
          className="slowImg"
          id="img1"
          loading="lazy"
        />
        <div id="beranda" className="banner">
          <div className="content">
            <p className="title">
              Distributor Produk
              <br />
              <span className="span">Es Krim</span> Berkualitas
            </p>
            <p className="desc" style={{maxWidth: "80%"}}>
              Kami menyediakan dan mendistribusikan es krim berkualitas
              dengan distribusi andal dan tepat waktu ke berbagai sektor usaha.
            </p>
          </div>
          <div className="buttonWrap">
            <a
              style={{ color: "white", backgroundColor: "#5996FD" }}
              href="https://wa.me/6282184846969"
              target="_blank"
              className="button"
            >
              Hubungi Kami
            </a>
            <a
              style={{ color: "black", border: "solid black 1px" }}
              href="#product"
              className="button"
            >
              Telusuri Produk
            </a>
          </div>
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
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Cari Produk"
                    className="input"
                  />
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
            <img
              src="/ice/2.webp"
              alt=""
              className="slowImg"
              id="img2"
              loading="lazy"
              data-speed="0.5"
            />
            <div className="product">
              {filtered
                .filter(
                  (item) =>
                    stateProductNav === "Semua" ||
                    item.brand === stateProductNav,
                )
                .slice(0, visible)
                .map((item, idx) => (
                  <div onClick={() =>
                    window.open(
                      `https://wa.me/6282184846969?text=${encodeURIComponent(
                        `Halo saya ingin pesan ${item.product} dari ${item.brand}`
                      )}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  } className="productCard" key={idx}>
                    <img
                      className="productImg"
                      src={item.foto}
                      alt={item.product}
                      loading="lazy"
                    />
                    <div className="productTop">
                      <div>
                        <p className="productTitle">{item.product}</p>
                        <p
                          style={{ fontSize: isMobile ? "12px" : "1rem" }}
                          className="productSmall"
                        >
                          {item.brand}
                        </p>
                      </div>
                    </div>
                    <div className="productBottom">
                      <div>
                        <p className="productSmall">Harga Ecer</p>
                        <p style={{ fontSize: isMobile ? "12px" : "1rem" }}>
                          {formatNumber(item.ecer)}
                        </p>
                      </div>
                      <div>
                        <p className="productSmall">Isi/dus</p>
                        <p style={{ fontSize: isMobile ? "12px" : "1rem" }}>
                          {item.isi}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {product.length > visible && (
            <div onClick={handleAddVisible} className="buttonContainer">
              <svg
                width="17"
                height="10"
                viewBox="0 0 17 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6823 0.730957L8.18231 7.73096L0.682312 0.730956"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
              <p>Lihat Lebih Banyak</p>
            </div>
          )}
        </div>
        <div id="about" className="aboutContainer">
          <img
            src="/ice/4.webp"
            alt=""
            className="slowImg"
            id="img3"
            loading="lazy"
          />
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
          <p className="desc" style={{}}>
            CV. Prima Amanah adalah perusahaan yang berdiri pada tanggal 05
            februari 2020, CV Prima Amanah bergerak di bidang distribusi food
            (produk ice cream & sembako) dan pemasaran CV. Prima Amanah telah
            mencakupp di wilayah Lamping Tengah, Lampung Timur, Metro, Bandar
            Lampung, Pesawaran, dan Kalianda
          </p>
          <Image/>
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
        <div style={{ width: "100%", height: "400px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8161649183126!2d105.32095921510287!3d-5.112903635800261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40bd2972e0b921%3A0xe204f0834670d036!2sCV.%20PRIMA%20AMANAH!5e0!3m2!1sid!2sid!4v1702978532872!5m2!1sid!2sid"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div className="footer">
          <img
            src="/product/footer/footer.webp"
            alt=""
            className="slowImg"
            id="img5"
            loading="lazy"
          />
          <div className="top">
            <div className="logo">
              <FooterLogo/>
              <p>Mitra Distribusi Produk Terpercaya dengan Jangkauan Wilayah yang Luas</p>
            </div>
            <div className="linkContainer">
              <p>Tautan</p>
              <div className="linkWrapper">
                <a href="#beranda">Beranda</a>
                <a href="#product">Produk</a>
                <a href="#about">Tentang Kami</a>
              </div>
            </div>
            <div className="addressContainer">
              <div className="addressWrapper">
                <p style={{fontSize: "2rem"}}>Alamat</p>
                <p>Yosodadi, Kec. Metro Timur, Kota Metro, Lampung 34124</p>
              </div>
              <div className="addressWrapper">
                <p style={{fontSize: "2rem"}}>Kontak</p>
                <p>082184846969</p>
              </div>
              <div className="addressWrapper">
                <p style={{fontSize: "2rem"}}>Jam Kerja</p>
                <p>
                  Senin sampai Jumat: 08.00–17.00
                  <br/>Sabtu: 08.00–14.00
                  <br/>Minggu: Tutup
                </p>
              </div>
            </div>
          </div>
          <div className="bottom"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
