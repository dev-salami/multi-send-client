"use client";
import React from "react";
import { ConnectWallet, useChain } from "@thirdweb-dev/react";
import Link from "next/link";
function Navbar() {
  const { chainId } = useChain();

  return (
    <section>
      <div className="flex justify-between items-center container mx-auto p-4">
        <div>MULTI-SEND</div>
        <div className=" hidden sm:flex text-sm uppercase  w-1/2 justify-between">
          <Link href="/">Home</Link>
          <Link href="/send">Send</Link>

          <button className="uppercase">Pricing</button>
          <Link href="/transactions">History</Link>

          <div></div>
        </div>
        <div className="flex gap-1 flex-col  items-center">
          <ConnectWallet />
          {chainId !== 11155111 && (
            <span className="text-xs text-red-500">Unsupported Chain</span>
          )}
        </div>
      </div>
      <hr />
    </section>
  );
}

export default Navbar;
