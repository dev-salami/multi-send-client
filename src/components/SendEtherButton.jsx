import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant";
import { ethers } from "ethers";
import React from "react";

function SendEtherButton({ AddressList, AmountList, totalAmount }) {
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
      // const functionArgs = [
      //   ["0x37eA8D8FA57a4ab5AE28d4b7F8703934200478a4"],
      //   [1],
      // ];
      const functionArgs = [AddressList, AmountList];
      // console.log(functionArgs);
      //   const recipientAddress = ethers.utils.getAddress(address);
      const Transaction = await Contract[functionName](
        ...functionArgs,

        {
          value: ethers.utils.parseEther(totalAmount.toString()) / 1e18,
        }
      );
      const txHash = await Transaction.wait();
      console.log(txHash.transactionHash);
      //  const tx = await signer.sendTransaction({
      //    // to: recipientAddress,
      //    to: "0x37eA8D8FA57a4ab5AE28d4b7F8703934200478a4",

      //    value: ethers.utils.parseEther(ether),
      //  });
    } catch (error) {
      console.error("Error in Start Payment:", error);
    }
  };
  return (
    <button
      disabled={hasEmptyString(AddressList) || hasEmptyValue(AmountList)}
      className=" bg-black disabled:bg-red-500 text-white w-full font-semibold py-1 px-3 rounded-md"
      onClick={() => {
        SendBulkETH();
      }}
    >
      Send ETH
    </button>
  );
}

export default SendEtherButton;
