import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../constant";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { TransactionType } from "../Types";
import { toast } from "sonner";
import { txSummaryType } from "./SuccessTab";

function SendToken({
  data,
  totalAmount,
  tokenContractAddress,
  fee,
  decimal,
  symbol,
  setTab,
}: {
  data: TransactionType[];
  setTab: React.Dispatch<React.SetStateAction<string>>;

  tokenContractAddress: string;
  totalAmount: number;
  fee: number;
  decimal: number;
  symbol: string;
}) {
  const { contract: tokenContract } = useContract(tokenContractAddress);

  const SendBulkToken = async () => {
    toast.loading("Approving");
    console.log(10 ** decimal);
    try {
      if (!window.ethereum) {
        toast.info("Install  a wallet");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const functionName = "bulkSendToken";
      const addressList = data.map((trxn) => trxn.address);
      const amountList = data.map((trxn) =>
        (trxn.amount * 10 ** decimal).toString()
      );

      const functionArgs = [tokenContractAddress, addressList, amountList];

      await tokenContract.erc20.setAllowance(CONTRACT_ADDRESS, totalAmount);
      toast.dismiss();
      toast.loading("Sending");

      const Transaction = await Contract[functionName](
        ...functionArgs,

        {
          // value: ethers.utils.parseEther(fee.toString()),
          value: fee.toString(),
        }
      );
      const txHash = await Transaction.wait(1);

      const transactionSummary: txSummaryType = {
        length: addressList.length,
        symbol: symbol,
        amount: totalAmount,
        hash: txHash.transactionHash,
      };

      localStorage.setItem("txSummary", JSON.stringify(transactionSummary));
      toast.dismiss();
      toast.success("Transaction Completed");
      setTimeout(() => {
        setTab("success");
      }, 2000);
      console.log(txHash.transactionHash);
    } catch (error) {
      toast.dismiss();
      toast.error("Transaction Failed");
      console.error("Error in Start Payment:", error);
    }
  };
  return (
    <>
      <button
        onClick={SendBulkToken}
        className="w-full text-center px-2 py-1 rounded-md mt-3 bg-[#00a7ff] text-white"
      >
        Send Token
      </button>
      {/* <TransactionSuccess /> */}
      {/* <>{msg === "success" && <TransactionSuccess hash={TransactionHash} />}</> */}
    </>
  );
}

export default SendToken;
