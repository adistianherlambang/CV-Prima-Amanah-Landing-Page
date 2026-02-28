import Marquee from "react-fast-marquee";
import { Korudo, Campina, Aice, Gracia } from "../ProductLogo";
import "./LogoSlider.css";

export default function LogoSlider() {
  return(
    <Marquee autoFill={true} speed={50}>
      <div className="sliderContainer">
        <Korudo />
        <Campina />
        <Aice />
        <Gracia />
      </div>
    </Marquee>
  )
}