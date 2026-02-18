import { useEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

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

    let baseVelocity = 100; // px per second
    let direction = 1;
    let x = 0;

    const wrapWidth = track.scrollWidth / 2;

    gsap.ticker.add((time, deltaTime) => {
      const delta = deltaTime / 1000;

      x += direction * baseVelocity * delta;

      if (x <= -wrapWidth) x = 0;
      if (x >= 0) x = -wrapWidth;

      gsap.set(track, { x });
    });

    ScrollTrigger.create({
      trigger: ".marquee",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        direction = velocity < 0 ? -1 : 1;

        const velocityFactor = Math.min(Math.abs(velocity) / 1000, 5);

        baseVelocity = 100 * (1 + velocityFactor);
      }
    });

    return () => {
      gsap.ticker.remove();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
