"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant";

function Page() {
  //   const startPayment = async ({ ether, address }) => {
  //     try {
  //       if (!window.ethereum) {
  //         console.log("Instal Metamask");
  //       }

  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);

  //       const signer = provider.getSigner();
  //       //   const recipientAddress = ethers.utils.getAddress(address);

  //       const tx = await signer.sendTransaction({
  //         // to: recipientAddress,
  //         to: "0x37eA8D8FA57a4ab5AE28d4b7F8703934200478a4",

  //         value: ethers.utils.parseEther(ether),
  //       });

  //       console.log({ ether, address });
  //     } catch (error) {
  //       console.error("Error in Start Payment:", error);
  //     }
  //   };
  const startPayment = async ({ ether, address }) => {
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
      const functionArgs = [
        ["0x37eA8D8FA57a4ab5AE28d4b7F8703934200478a4"],
        [1],
      ];
      //   const recipientAddress = ethers.utils.getAddress(address);
      const Transaction = await Contract[functionName](...functionArgs, {
        value: 1,
      });
      const txHash = await Transaction.wait();
      console.log(txHash.transactionHash);
      //  const tx = await signer.sendTransaction({
      //    // to: recipientAddress,
      //    to: "0x37eA8D8FA57a4ab5AE28d4b7F8703934200478a4",

      //    value: ethers.utils.parseEther(ether),
      //  });

      console.log({ ether, address });
    } catch (error) {
      console.error("Error in Start Payment:", error);
    }
  };

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const SendEther = async (e) => {
    e.preventDefault();
    await startPayment({
      ether: "0.02",
      addr: "0x37eA8D8FA57a4ab5AE28d4b7F8703934200478a4",
    });
  };
  return (
    <div>
      <Navbar />
      <button onClick={SendEther}>Send Ether</button>
    </div>
  );
}

export default Page;
