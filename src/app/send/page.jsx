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
  const [totalToken_Amount, setTotalToken_Amount] = useState(0);

  const [Token_Contract_Address, setToken_Contract_Address] = useState(
    "0xE2Aef55875c8DcC012c66a521fA5B78E597e9D15"
  );

  const calculate = () => {
    let sum = ETH_Amount.reduce((acc, cur) => cur + acc);
    sum = Number(sum).toFixed(5);

    return ethers.utils.parseEther(sum.toString());
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl border rounded-xl p-4 mx-auto mt-8">
        <div></div>
        <div className="  flex items-center text-sm mb-2  gap-6  duration-500">
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
          <div className="flex flex-col w-1/2 gap-1 ">
            <label className="pl-2" htmlFor="file">
              Import Excel File
            </label>
            <input
              id="file"
              placeholder=" + import"
              type="file"
              className=" h-6 rounded-md  bg-gradient-to-r from-[#c887f3] to-[#f3afad]"
            />
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

          {/* <Send
            AddressList={ETHAddress}
            AmountList={ETH_Amount}
            totalAmount={calculate()}
          /> */}
        </div>
      </main>
    </div>
  );
}

export default Page;
