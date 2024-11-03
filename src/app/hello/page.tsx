"use client";
import React, { useState, useEffect } from "react";
import { createPublicClient, http, parseAbi } from "viem";
import { sepolia } from "viem/chains";
import { EVENT_TICKET_ABI } from "../../abi";

// Define the contract ABI
// const TICKET_ABI = parseAbi(EVENT_TICKET_ABI);

const CONTRACT_ADDRESS = "0x5740e3e95C89A053edCCA033F52CC3F351FEEBA6";

const ContractInteraction = () => {
  const [client, setClient] = useState<any>(null);
  const [result, setResult] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const initializeClient = async () => {
      const newClient = createPublicClient({
        chain: sepolia,
        transport: http(),
      });
      setClient(newClient);
    };

    initializeClient();
  }, []);

  const callViewFunction = async () => {
    if (!client) return;

    try {
      const data = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: EVENT_TICKET_ABI,
        functionName: "i_maxTicket",
      });
      setResult(`Result: ${data.toString()}`);
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const callWriteFunction = async () => {
    if (!client) return;

    try {
      const { request } = await client.simulateContract({
        address: CONTRACT_ADDRESS,
        abi: EVENT_TICKET_ABI,
        functionName: "anotherFunction",
        args: [BigInt(inputValue)],
      });
      setResult(`Transaction simulated successfully. Ready to send.`);
      // Note: To actually send the transaction, you'd need to use a wallet or signer.
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md mt-20 text-black">
      <h2 className="text-xl font-bold mb-4">Contract Interaction</h2>
      <button
        onClick={callViewFunction}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
      >
        Call View Function
      </button>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value for write function"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={callWriteFunction}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Simulate Write Function
        </button>
      </div>
      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p className="font-semibold">Result:</p>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default ContractInteraction;
