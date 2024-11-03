import { ethers } from "ethers";
import React, { useState } from "react";
import { TransactionType } from "../Types";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../constant";
import { toast } from "sonner";
import { txSummaryType } from "./SuccessTab";

function SendEth({
  data,
  totalAmount,
  fee,
  setTab,
}: {
  data: TransactionType[];
  totalAmount: number;
  setTab: React.Dispatch<React.SetStateAction<string>>;

  fee: number;
}) {
  const [msg, setMsg] = useState("");
  const [TransactionHash, setTransactionHash] = useState("");

  const SendBulkETH = async () => {
    toast.loading("Transaction in progress");

    try {
      if (!window.ethereum) {
        toast.dismiss();
        toast.info("Install a wallet");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const functionName = "bulkSendEth";

      const addressList = data.map((trxn) => trxn.address);
      const amountList = data.map((trxn) => (trxn.amount * 1e18).toString());
      const value = (totalAmount * 1e18 + fee).toString();
      console.log(value);

      const functionArgs = [addressList, amountList];

      const Transaction = await Contract[functionName](
        ...functionArgs,

        {
          value: value,
        }
      );
      const txHash = await Transaction.wait();

      const transactionSummary: txSummaryType = {
        length: addressList.length,
        symbol: "ETH",
        amount: totalAmount,
        hash: txHash.transactionHash,
      };
      localStorage.setItem("txSummary", JSON.stringify(transactionSummary));

      toast.dismiss();
      toast.success("Transaction successful");
      console.log(txHash.transactionHash);
      setTransactionHash(txHash.transactionHash);
      setTimeout(() => {
        setTab("success");
      }, 2000);
      setMsg("success");
    } catch (error) {
      toast.dismiss();
      toast.error("Transaction Failed");
      console.error("Error in Start Payment:", error.message);
    }
  };
  return (
    <>
      {" "}
      <button
        onClick={() => {
          SendBulkETH();
        }}
        className="w-full text-center px-2 py-1 rounded-md mt-3 bg-[#00a7ff] text-white"
      >
        Send ETH
      </button>
      {/* <>{msg === "success" && <TransactionSuccess hash={TransactionHash} />}</> */}
    </>
  );
}

export default SendEth;
