import { shortenAddress, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { toast } from "sonner";

export type txSummaryType = {
  length: number;
  amount: number;
  hash: string;
  symbol: string;
};
function SuccessTab() {
  const [txSummary, setTxSummary] = useState<txSummaryType | null>(null);
  const address = useAddress();
  useEffect(() => {
    const trxn: txSummaryType = JSON.parse(localStorage.getItem("txSummary"));

    if (trxn) {
      setTxSummary(trxn);
    } else {
      toast.info("Error getting Tranaction Summary");
    }
  }, []);

  return (
    <section className="border border-[#00a7ff]/50 p-4 mt-14 rounded-md text-xs max-w-sm w-full mx-auto ">
      <div className="w-full border-[#00a7ff]/30 rounded-md p-6 border">
        <div className="flex flex-col rounded-full border border-[#00a7ff]/50 text-[#00a7ff] from-[#091a86] via-[#091251] to-[#091a86] bg-gradient-to-r  justify-center items-center gap-2 h-24 w-24 mx-auto">
          <FaArrowDownLong size={40} />
        </div>
        <p className="text-white text-center uppercase mt-4  ">
          {txSummary?.amount} {txSummary?.symbol} <br />
          Sent
        </p>
        {/* <p>{`${length} ${length > 1 ? "Addresses" : "Address"}`}</p> */}
      </div>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex justify-between">
          <span>Owner</span>
          <span>
            <span>{shortenAddress(address)}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span>Recipents</span>
          <span>{`${txSummary?.length} ${
            txSummary?.length > 1 ? "Addresses" : "Address"
          }`}</span>
        </div>
        <div className="flex justify-between">
          <span>Token</span>
          <span className="uppercase">
            {txSummary?.amount} {txSummary?.symbol}
          </span>
        </div>
      </div>
      <hr className="border-[#00a7ff]/30" />
      <div className="w-full grid-cols-2 grid     gap-2 border-emerald-500">
        <Link
          className="w-full text-center p-2 rounded-md mt-3 bg-[#00a7ff] text-white"
          href="/ "
        >
          Home
        </Link>

        <a
          href={`https://sepolia.etherscan.io/tx/${txSummary?.hash}`}
          className="w-full text-center p-2 rounded-md mt-3 bg-[#00a7ff] text-white"
        >
          View Transaction
        </a>
      </div>
    </section>
  );
}

export default SuccessTab;
