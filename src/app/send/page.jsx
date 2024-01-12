"use client";
import Navbar from "@/components/Navbar";
import Send from "@/components/SendEtherButton";
import SendEther from "@/components/SendEther";
import SendToken from "@/components/SendToken";
import { BigNumber, ethers } from "ethers";

import React, { useState } from "react";

function Page() {
  const [tab, setTab] = useState("eth");
  const [ETH_Total, setETH_Total] = useState(0);

  const [TokenAddress, setTokenAddress] = useState([""]);
  const [ETHAddress, setETHAddress] = useState([""]);
  const [ETH_Amount, setETH_Amount] = useState([""]);
  const [Token_Amount, setToken_Amount] = useState([""]);
  const [Json_text, setJson_text] = useState([""]);

  const [totalToken_Amount, setTotalToken_Amount] = useState(0);

  const [Token_Contract_Address, setToken_Contract_Address] = useState(
    "0xE2Aef55875c8DcC012c66a521fA5B78E597e9D15"
  );
  function isValidJSONArray(input) {
    try {
      const parsedJSON = JSON.parse(input);
      return Array.isArray(parsedJSON);
    } catch (error) {
      return false;
    }
  }
  const JSONParser = (arr) => {
    const isValid = isValidJSONArray(arr);
    console.log(ETHAddress, ETH_Amount, arr);

    if (isValid) {
      // window.alert("Invalid JSON pasted");
    } else {
      const addresses = arr.map((entry) => entry.address);
      const amounts = arr.map((entry) =>
        JSON.stringify(Number(entry.amount) * 1e18)
      );
      console.log(addresses);
      console.log(amounts);
      if (tab === "eth") {
        setETHAddress(addresses);
        setETH_Amount(amounts);
      } else {
        setTokenAddress(addresses);
        setToken_Amount(amounts);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl border rounded-xl p-4 mx-auto mt-8">
        <div className="  flex flex-col items-center text-sm mb-2    gap-3">
          <div className="flex gap-4">
            <button
              className={`rounded-md px-4 py-2 text-center w-fit    ${
                tab === "eth" ? "bg-green-500" : "bg-white text-black"
              }`}
              onClick={() => setTab("eth")}
            >
              Send Ether
            </button>
            <button
              className={`rounded-md px-4 py-2 text-center w-fit   ${
                tab === "token" ? "bg-green-500" : "bg-white text-black"
              }`}
              onClick={() => setTab("token")}
            >
              Send Token
            </button>
          </div>
        </div>
        <hr />
        <div className="mt-6">
          {tab === "eth" && (
            <SendEther
              ETHAddress={ETHAddress}
              ETH_Amount={ETH_Amount}
              ETH_Total={ETH_Total}
              setETHAddress={setETHAddress}
              setETH_Amount={setETH_Amount}
              setETH_Total={setETH_Total}
            />
          )}
          {tab === "token" && (
            <SendToken
              TokenAddress={TokenAddress}
              Token_Amount={Token_Amount}
              totalToken_Amount={totalToken_Amount}
              setTokenAddress={setTokenAddress}
              setToken_Amount={setToken_Amount}
              setTotalToken_Amount={setTotalToken_Amount}
              Token_Contract_Address={Token_Contract_Address}
              setToken_Contract_Address={setToken_Contract_Address}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Page;

{
  /* FILE IMPORT OPTION */
}
{
  /* <div className="">
            <input
              type="text"
              className="border border-black rounded-md py-1 px-2 text-gray-900 w-full"
              placeholder="Paste JSON text"
              value={Json_text}
              onChange={(e) => {
                setJson_text(e.target.value);
                JSONParser(JSON.parse(e.target.value));
              }}
            />
            <p className="">
              Ensure key for address in the pasted JSON is "address" and key for
              amount is named "amount" in eth
            </p>
          </div> */
}
//  <div>
//    <div className="w-full">
//      <label
//        htmlFor="dropzone-file"
//        className="flex gap-3   w-full  p-2   bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
//      >
//        <svg
//          xmlns="http://www.w3.org/2000/svg"
//          fill="none"
//          viewBox="0 0 24 24"
//          strokeWidth="1.5"
//          stroke="currentColor"
//          className="w-8 h-8 text-gray-500 dark:text-gray-400"
//        >
//          <path
//            strokeLinecap="round"
//            strokeLinejoin="round"
//            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//          />
//        </svg>
//        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
//          Import Excel File
//        </h2>
//        {/* <p class="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
//               SVG, PNG, JPG or GIF (MAX. 512x512px)
//             </p> */}
//        <input id="dropzone-file" type="file" className="hidden" />
//      </label>
//    </div>
//    <p className="">
//      Ensure column for address in the excel file is named "address" and column
//      for amount is name "amount" in eth
//    </p>
//  </div>;
