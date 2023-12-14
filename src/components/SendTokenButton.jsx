import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import TransactionSuccess from "./Success";

function SendTokenButton({
  AddressList,
  tokenAmountList,
  tokenContractAddress,
  totalToken_Amount,
  fee,
}) {
  const [msg, setMsg] = useState("");
  const [TransactionHash, setTransactionHash] = useState("");

  function hasEmptyString(arr) {
    if (arr.length === 0) {
      return false;
    } else {
      return arr.some((element) => element.trim() === "");
    }
  }
  function hasEmptyValue(arr) {
    if (arr.length === 0) {
      return false;
    } else {
      return arr.some((element) => element === "" || element == 0);
    }
  }
  const { contract: tokenContract } = useContract(tokenContractAddress);
  const SendBulkToken = async () => {
    console.log(totalToken_Amount);
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
      const functionName = "bulkSendToken";

      const functionArgs = [tokenContractAddress, AddressList, tokenAmountList];

      await tokenContract.erc20.setAllowance(
        CONTRACT_ADDRESS,
        totalToken_Amount
      );
      const Transaction = await Contract[functionName](
        ...functionArgs,

        {
          value: ethers.utils.parseEther(fee.toString()),
        }
      );
      const txHash = await Transaction.wait(1);
      setTransactionHash(txHash.transactionHash);
      setMsg("success");
      console.log(txHash.transactionHash);
    } catch (error) {
      window.alert("Something went wrong !");
      console.error("Error in Start Payment:", error);
    }
  };
  return (
    <>
      <button
        disabled={hasEmptyString(AddressList) || hasEmptyValue(tokenAmountList)}
        className=" bg-black disabled:bg-red-500 text-white w-full font-semibold py-1 px-3 rounded-md"
        onClick={() => {
          SendBulkToken();
        }}
      >
        Send Token
      </button>
      {/* <TransactionSuccess /> */}
      <>{msg === "success" && <TransactionSuccess hash={TransactionHash} />}</>
    </>
  );
}

export default SendTokenButton;
