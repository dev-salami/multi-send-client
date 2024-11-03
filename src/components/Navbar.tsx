"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ConnectWallet,
  getChainIdOrName,
  shortenAddress,
  useAddress,
  useBalance,
  useChain,
  useChainId,
  useConnect,
  useDisconnect,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [chainName, setChainName] = useState<string | number>("");
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useConnect();

  const {
    data: ethBalance,
    isLoading: isLoadingEthBalance,
    error: ethBalanceError,
  } = useBalance();

  const chainId = useChainId();

  return (
    <header className="fixed left-0 text-xs top-0 z-10 w-full backdrop-blur transition-all   ">
      <nav
        className="container mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Navbar"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className=" italic font-semibold text-base">Multi-Send</span>
          </Link>
        </div>
        <div className="flex gap-6 mr-12">
          <Link href="/send">Send</Link>
          <Link href="/transactions">Transactions</Link>
        </div>
        <div className="flex items-center gap-3">
          {address && (
            <>
              {chainId === 11155111 ? (
                <p className="px-2 py-2 rounded-md border-[#00a7ff] border !text-[#00a7ff]">
                  Sepolia
                </p>
              ) : (
                <p className="text-red-600">Unsupported</p>
              )}
              <button
                onClick={() => disconnect()}
                className="border border-[#00a7ff] text-[#00a7ff] py-2 rounded-md"
              >
                <span className="px-2">
                  {ethBalance && (
                    <span>
                      {Number(ethBalance.displayValue).toFixed(2)}{" "}
                      {ethBalance.symbol}
                    </span>
                  )}
                  {isLoadingEthBalance && !ethBalance && (
                    <span className="animate-pulse text-base -mb-1 ">
                      {" "}
                      • • •
                    </span>
                  )}
                </span>
                <span className="bg-gray-500/20 p-2 pr- rounded-r-md">
                  {shortenAddress(address)}
                </span>
              </button>
            </>
          )}

          {!address && (
            <div className="border rounded-md   ml-6 border-[#00a7ff] !text-[#00a7ff]">
              <ConnectWallet
                theme={"dark"}
                className="!border border-[#00a7ff] !text-[#00a7ff] !text-xs !p-2 !text-center !rounded-md   !w-fit !bg-transparent  "
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

// "use client";
// import React from "react";
// import { ConnectWallet, useChainId } from "@thirdweb-dev/react";
// import Link from "next/link";
// function Navbar() {
//   const chainId = useChainId();

//   return (
//     <section>
//       <div className="flex justify-between items-center container mx-auto p-4">
//         <div>MULTI-SEND</div>
//         <div className=" hidden sm:flex text-sm uppercase  w-1/2 justify-between">
//           <Link href="/">Home</Link>
//           <Link href="/send">Send</Link>

//           <button className="uppercase">Pricing</button>
//           <Link href="/transactions">History</Link>

//           <div></div>
//         </div>
//         <div className="flex gap-1 flex-col  items-center">
//           <ConnectWallet />
//           {chainId !== 11155111 && (
//             <span className="text-xs text-red-500">Unsupported Chain</span>
//           )}
//         </div>
//       </div>
//       <hr />
//     </section>
//   );
// }

// export default Navbar;
