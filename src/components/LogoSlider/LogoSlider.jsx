import { useEffect, useRef } from "react";

import "./LogoSlider.css";
import { Korudo, Campina, Aice, Gracia } from "../ProductLogo";

export default function LogoSlider() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    // clone semua child sekali
    const children = [...track.children];
    children.forEach((child) => {
      track.appendChild(child.cloneNode(true));
    });
  }, []);

  return (
    <div className="marquee">
      <div className="marqueeTrack" ref={trackRef}>
        <Korudo />
        <Campina />
        <Aice />
        <Gracia />
      </div>
    </div>
  );
}
