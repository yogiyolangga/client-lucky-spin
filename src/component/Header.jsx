import React, { useEffect } from "react";

const Header = () => {

    useEffect(() => {
        const hamburger = document.querySelector("#hamburger");
        const navMenu = document.querySelector("#nav-menu");
    
        hamburger.onclick = function () {
          hamburger.classList.toggle("hamburger-active");
          navMenu.classList.toggle("hidden");
        };
    
        window.onclick = function (e) {
          if (e.target !== hamburger && e.target !== navMenu) {
            hamburger.classList.remove("hamburger-active");
            navMenu.classList.add("hidden");
          }
        };
      });


  return (
    <div className="fixed top-0 left-0 z-20 flex items-center w-full bg-white shadow-sm shadow-black">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <a href="/" className="block py-6 font-bold">
              <img src="/img/fortunewheel.png" alt="FortuneWheel" className="h-12" />
            </a>
          </div>
          <div className="flex items-center px-4 nav-bungkus">
            <button id="hamburger" name="hamburger" type="button" className="absolute block right-4 lg:hidden">
                <span className="transition duration-300 ease-in origin-top-left hamburger-line"></span>
                <span className="transition duration-300 ease-in hamburger-line"></span>
                <span className="transition duration-300 ease-in origin-top-left hamburger-line"></span>
            </button>
            <nav id="nav-menu" className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none">
                <ul className="block lg:flex">
                    <li className="group">
                        <a href="/" className="flex py-2 mx-8 text-base lg:text-lg lg:text-white lg:font-semibold">Home</a>
                    </li>
                    <li className="group">
                        <a href="https://FortuneWheel.bond/" className="flex py-2 mx-8 text-base lg:text-lg lg:text-white lg:font-bold">Promo</a>
                    </li>
                    <li className="group">
                        <a href="https://FortuneWheel.bond/" className="flex py-2 mx-8 text-base lg:text-lg lg:text-white lg:font-bold">Daftar</a>
                    </li>
                    <li className="group">
                        <a href="https://FortuneWheel.bond/" className="flex py-2 mx-8 text-base lg:text-lg lg:text-white lg:font-bold">Klaim Spincode </a>
                    </li>
                    <li className="group">
                        <a href="https://FortuneWheel.bond/" className="flex py-2 mx-8 text-base lg:text-lg lg:text-white lg:font-bold">Kontak</a>
                    </li>
                </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
