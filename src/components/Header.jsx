import React from "react";
import airdrop from "../../public/airdrop.jpg";
import Image from "next/image";

function Header() {
  return (
    <div className=" container mx-auto px-6">
      <div className="grid grid-cols-1 items-center mt-10 justify-center md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex gap-1 items-center ">
            <div className="border-b-2  w-12 block"></div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c887f3] to-[#f3afad]">
              Lorem ipsum dolor sit amet.
            </span>
            <div className="border-b-2  w-12 block"></div>
          </div>
          <div className="text-4xl md:text-6xl  font-semibold leading-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            aspernatur excepturi voluptates fugit quae impedit, praesentium ab
            iusto sed maiores.
          </p>
          <div className="flex gap-6">
            <button className=" rounded-md px-6 py-2 bg-gradient-to-r from-[#c887f3] to-[#f3afad]">
              Get Started
            </button>
            <button>Demo Video</button>
          </div>
        </div>
        <div className="md:mt-0 mt-12">
          <Image
            className="  md:w-4/5 mx-auto rounded-xl"
            src={airdrop}
            alt="header-image"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Header;
