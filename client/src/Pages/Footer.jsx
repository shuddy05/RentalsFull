import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#0C092C] text-white">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between px-6 sm:px-12 md:px-[90px] py-8 md:py-[40px] gap-8 sm:gap-6">
        <h1 className="text-[36px] sm:text-[48px] md:text-[56px] leading-tight font-bold">
          Find
          <br />
          Your
          <br />
          Dream
          <br />
          Home
        </h1>

        <div className="text-[14px] flex flex-col justify-between">
          <ul className="flex flex-col gap-2">
            <li className="hover:text-white/70 ">Home</li>
            <li className="hover:text-white/70 ">Property</li>
            <li className="hover:text-white/70 ">About</li>
            <li className="hover:text-white/70 ">Contact</li>
          </ul>
          <div>
            <h2 className="text-white/80 mb-1 ">CONTACT US</h2>
            <p>+234 8108879508</p>
            <p>horlabodehyibrahim@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end justify-between gap-6">
          <p className="text-white/70 text-sm">{`© ${new Date().getFullYear()} — Copyright`}</p>
          <div className="flex gap-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-white/70 " />
            <FaSquareInstagram className="cursor-pointer hover:text-white/70 " />
            <FaYoutube className="cursor-pointer hover:text-white/70 " />
            <FaLinkedinIn className="cursor-pointer hover:text-white/70 " />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
