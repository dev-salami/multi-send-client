import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant";
import { ethers } from "ethers";
import React, { useState } from "react";
import TransactionSuccess from "./Success";

function SendEtherButton({ AddressList, AmountList, totalAmount }) {
  const [msg, setMsg] = useState("");
  const [TransactionHash, setTransactionHash] = useState("");

  function hasEmptyString(arr) {
    // Check if any element in the array is an empty string
    if (arr.length === 0) {
      return false;
    } else {
      return arr.some((element) => element.trim() === "");
    }
  }
  function hasEmptyValue(arr) {
    // Check if any element in the array is an empty string
    if (arr.length === 0) {
      return false;
    } else {
      return arr.some((element) => element === "" || element == 0);
    }
  }
  const SendBulkETH = async () => {
    console.log(totalAmount, AmountList);
    try {
      if (!window.ethereum) {
        console.log("Install Metamask");
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

      const functionArgs = [AddressList, AmountList];

      const Transaction = await Contract[functionName](
        ...functionArgs,

        {
          value: totalAmount.toString(),
        }
      );
      const txHash = await Transaction.wait();
      console.log(txHash.transactionHash);
      setTransactionHash(txHash.transactionHash);
      setMsg("success");
    } catch (error) {
      window.alert("Something went wrong !");

      console.error("Error in Start Payment:", error.message);
    }
  };
  return (
    <>
      {" "}
      <button
        disabled={hasEmptyString(AddressList) || hasEmptyValue(AmountList)}
        className=" bg-black disabled:bg-red-500 text-white w-full font-semibold py-1 px-3 rounded-md"
        onClick={() => {
          SendBulkETH();
        }}
      >
        Send ETH
      </button>
      <>{msg === "success" && <TransactionSuccess hash={TransactionHash} />}</>
    </>
  );
}

export default SendEtherButton;
