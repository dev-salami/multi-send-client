"use client";
import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
function Navbar() {
  return (
    <section>
      <div className="flex justify-between items-center container mx-auto p-4">
        <div>LOGO</div>
        <div className=" hidden sm:flex text-sm uppercase  w-1/2 justify-between">
          <Link href="/">Home</Link>
          <Link href="/send">Send</Link>
          {/* <Link href="/pricing">Pricing</Link>
          <Link href="/transactions">History</Link> */}
          <button className="uppercase">Pricing</button>
          <Link href="/transactions">History</Link>
          <button className="uppercase">History</button>

          <div></div>
        </div>
        <ConnectWallet />
      </div>
      <hr />
    </section>
  );
}

export default Navbar;
