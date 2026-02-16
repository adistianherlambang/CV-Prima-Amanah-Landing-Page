import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";

import { NavLogo, FooterLogo } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <nav className="nav">
      <NavLogo />
      <div className="navWrapper" ref={navRef}>
        <div className="navBg" ref={bgRef}></div>
        <a href="#beranda" className="navItem">
          Beranda
        </a>
        <a href="#product" className="navItem">
          Product
        </a>
        <a href="#about" className="navItem">
          About
        </a>
      </div>
      <div className="navContact">
        <a href="" className="navContactLink">
          Hubungi Kami
        </a>
      </div>
    </nav>
  );
}
