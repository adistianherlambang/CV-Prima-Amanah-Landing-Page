import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";

import { NavLogo, FooterLogo } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const bgRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Hanya jalankan GSAP jika bukan mobile
    if (isMobile) return;

    const nav = navRef.current;
    const bg = bgRef.current;
    const items = nav.querySelectorAll(".navItem");

    function moveBackground(target) {
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement.getBoundingClientRect();

      gsap.to(bg, {
        x: rect.left - parentRect.left,
        width: rect.width,
        duration: 1,
        ease: "power3.out",
      });

      // ubah warna item yang aktif
      items.forEach((item) => {
        if (item === target) {
          gsap.to(item, {
            color: "#ffffff",
            duration: 1,
            ease: "power3.out",
          });
        } else {
          gsap.to(item, {
            color: "#000",
            duration: 1,
            ease: "power3.out",
          });
        }
      });
    }

    items.forEach((item) => {
      const id = item.getAttribute("href");

      ScrollTrigger.create({
        trigger: id,
        start: "top center",
        end: "bottom center",
        onEnter: () => moveBackground(item),
        onEnterBack: () => moveBackground(item),
      });

      item.addEventListener("click", () => {
        moveBackground(item);
      });
    });

    //set default bg kalo items ada
    if (items.length > 0) {
      moveBackground(items[0]);
    }
  }, [isMobile]);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav">
      <NavLogo />
      
      {/* Desktop Navigation */}
      <div className="navWrapper" ref={navRef}>
        <div className="navBg" ref={bgRef}></div>
        <a href="#beranda" className="navItem">
          Beranda
        </a>
        <a href="#product" className="navItem">
          Product
        </a>
        <a href="#about" className="navItem">
          Tentang Kami
        </a>
      </div>

      {/* Mobile Hamburger Menu */}
      <button 
        className="navHamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburgerLine ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`hamburgerLine ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`hamburgerLine ${isMenuOpen ? "open" : ""}`}></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navMobileMenu">
          <a href="#beranda" className="navMobileItem" onClick={handleMenuItemClick}>
            Beranda
          </a>
          <a href="#product" className="navMobileItem" onClick={handleMenuItemClick}>
            Product
          </a>
          <a href="#about" className="navMobileItem" onClick={handleMenuItemClick}>
            Tentang Kami
          </a>
          <a href="https://wa.me/6282184846969" target="_blank" className="navMobileItem navMobileContact">
            Hubungi Kami
          </a>
        </div>
      )}

      {/* Desktop Contact Button */}
      <div className="navContact">
        <a  href="https://wa.me/6282184846969" target="_blank" className="navContactLink">
          Hubungi Kami
        </a>
      </div>
    </nav>
  );
}
