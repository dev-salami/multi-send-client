import React from "react";
import { TransactionType } from "../Types";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";

type PreviewProps = {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  data: TransactionType[];
  native: boolean;
  setTokenContractAddress: React.Dispatch<React.SetStateAction<string>>;
  tokenContractAddress: string;
};

function Preview({
  setTab,
  data,
  native,
  tokenContractAddress,
  setTokenContractAddress,
}: PreviewProps) {
  const address = useAddress();

  const { contract: tokenContract } = useContract(tokenContractAddress);

  const {
    data: tokenBalance,
    isLoading: isLoadingTokenBalance,
    error: tokenBalanceError,
  } = useTokenBalance(tokenContract, address);

  return (
    <div className="text-xs border rounded-md p-4 flex flex-col gap-4 border-[#00a7ff]/50 mx-auto">
      <section>
        {!native && (
          <div>
            <div className="flex justify-between">
              <label className="pl-2 pb-2" htmlFor="tokenAddress">
                Token Address
              </label>
              <p className="flex items-center gap-3">
                <span>Balance</span>
                <span>
                  {tokenBalance && (
                    <span>
                      {Number(tokenBalance.displayValue).toFixed(5)}{" "}
                      {tokenBalance.symbol}
                    </span>
                  )}
                  {isLoadingTokenBalance && !tokenBalance && (
                    <span className="animate-pulse text-xl -mb-1 "> • • •</span>
                  )}
                  {tokenBalanceError &&
                    !isLoadingTokenBalance &&
                    !tokenBalance && <span>N/A</span>}
                </span>
              </p>
            </div>
            <div className="w-full">
              <input
                onChange={(e) => setTokenContractAddress(e.target.value)}
                value={tokenContractAddress}
                className="bg-transparent w-full border border-[#00a7ff]/50 px-2 py-1 rounded-md text-gray-200"
                type="text"
                placeholder="Token contract address"
              />
            </div>
          </div>
        )}
      </section>
      <section>
        <p className="px-2 flex justify-between text-xs pb-2">
          <span>List of addresses</span>
          <span>Amount</span>
        </p>
        <main className="border  border-[#00a7ff]/50 rounded-md flex text-xs  ">
          <div className="w-10 flex flex-col gap-2 bg-gray-500/20 text-center p-2 border-r border-[#00a7ff]/50">
            {data.map((transaction, index) => (
              <p key={index}>{index + 1}</p>
            ))}
          </div>
          <div className="w-full text-xs flex flex-col gap-2 p-2">
            {data.map((transaction, index) => (
              <p key={index}>{transaction.address}</p>
            ))}
          </div>
          <div className="w-10 flex flex-col gap-2 text-center p-2">
            {data.map((transaction, index) => (
              <p key={index}>{transaction.amount}</p>
            ))}
          </div>
        </main>
      </section>
      <div className="flex gap-4">
        <button
          onClick={() => setTab("form")}
          className="w-full text-center px-2 py-1 rounded-md bg-[#00a7ff] text-white"
        >
          Edit
        </button>{" "}
        <button
          disabled={tokenBalanceError && true}
          onClick={() => {
            if (!native && !tokenContractAddress) {
            } else {
              setTab("send");
            }
          }}
          className="w-full text-center px-2 py-1 rounded-md bg-[#00a7ff] text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Preview;
