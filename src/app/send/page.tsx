"use client";
import React, { useState } from "react";
import Tab from "./_components/Tab";
import DataForm from "./_components/Form";
import Preview from "./_components/Preview";
import Send from "./_components/Send";
import { TransactionType } from "./Types";
import SuccessTab from "./_components/SuccessTab";

function SendPage() {
  const [tab, setTab] = useState("form");
  const [tokenContractAddress, setTokenContractAddress] = useState<
    string | null
  >("0xE2Aef55875c8DcC012c66a521fA5B78E597e9D15");

  const [data, setData] = useState<TransactionType[] | []>([]);
  const [native, setNative] = useState<boolean>(true);

  const retrieveData = () => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      setData(storedData);
    }
  };

  return (
    <section className=" h-full mt-20 py-20  ">
      <div className="max-w-md mx-auto">
        {tab === "preview" && (
          <div className="flex gap-4 mb-6 text-xs px-4">
            <button
              onClick={() => setNative(false)}
              className={`${
                native ? "border-[#00a7ff] border" : "bg-[#00a7ff]"
              } w-full text-center p-2 rounded-md mt-3  text-white`}
            >
              SEND TOKENS
            </button>
            <button
              onClick={() => setNative(true)}
              className={`${
                !native ? "border-[#00a7ff] border" : "bg-[#00a7ff]"
              } w-full text-center p-2 rounded-md mt-3  text-white`}
            >
              SEND ETH
            </button>
          </div>
        )}
        <Tab tab={tab} />
        {tab === "form" && (
          <DataForm data={data} setTab={setTab} tab={tab} setData={setData} />
        )}
        {tab === "preview" && (
          <Preview
            native={native}
            tokenContractAddress={tokenContractAddress}
            setTokenContractAddress={setTokenContractAddress}
            setTab={setTab}
            data={data}
          />
        )}
        {tab === "send" || tab === "success" ? (
          <Send
            tab={tab}
            native={native}
            tokenContractAddress={tokenContractAddress}
            setTab={setTab}
            data={data}
          />
        ) : null}
      </div>
    </section>
  );
}

export default SendPage;
