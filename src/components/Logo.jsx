import React from "react";
import "./Logo.css"

function NavLogo() {
  return (
    <div className="navLogo">
      <img src="/Logo/PANav.svg" alt="logo"/>
    </div>
  );
}

function FooterLogo() {
  return (
    <div className="footerLogo">
      <img src="/Logo/PAFooter.svg" alt="logo"/>
    </div>
  );
}

export { NavLogo, FooterLogo };
