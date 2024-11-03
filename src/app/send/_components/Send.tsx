import React from "react";
import { TransactionType } from "../Types";
import SendToken from "./SendToken";
import {
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../../constant";
import SendEth from "./SendEth";
import SuccessTab from "./SuccessTab";

function Send({
  data,
  native,
  tab,
  setTab,
  tokenContractAddress,
}: {
  data: TransactionType[];
  native: boolean;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tokenContractAddress: string;
}) {
  const address = useAddress();
  const {
    data: ethBalance,
    isLoading: isLoadingEthBalance,
    error: ethBalanceError,
  } = useBalance();

  const { contract: tokenContract } = useContract(tokenContractAddress);

  const {
    data: tokenBalance,
    isLoading: isLoadingTokenBalance,
    error: tokenBalanceError,
  } = useTokenBalance(tokenContract, address);

  // To get sending fee
  const { contract: MULTI_SEND_CONTRACT } = useContract(CONTRACT_ADDRESS);
  const { data: tokenSendFee, isLoading: tokenSendFeeLoading } =
    useContractRead(MULTI_SEND_CONTRACT, "tokenSendFee");
  const { data: ethSendFee, isLoading: ethSendFeeLoading } = useContractRead(
    MULTI_SEND_CONTRACT,
    "tokenSendFee"
  );

  if (tab === "success") {
    return <SuccessTab />;
  } else {
    return (
      <section className="border border-[#00a7ff]/50 p-3 mt-4 rounded-md text-sm">
        <div className="grid grid-cols-2 gap-3  ">
          <div className="text-center p-4 border rounded-md border-[#00a7ff]/50">
            <p>{data?.length}</p>
            <p className="text-[#00a7ff]/50">Total Number of entries</p>
          </div>
          <div className="text-center p-4 border rounded-md border-[#00a7ff]/50">
            <p>
              {data
                ?.map((trxn, index) => trxn.amount)
                .reduce((acc, cur) => acc + cur, 0)}{" "}
              {native ? (
                <> {ethBalance?.symbol}</>
              ) : (
                <> {tokenBalance?.symbol}</>
              )}
            </p>
            <p className="text-[#00a7ff]/50">Total Amount</p>
          </div>{" "}
          <div className="text-center p-4 border rounded-md border-[#00a7ff]/50">
            <p>
              {native ? (
                <p className="text-[#00a7ff]/50">
                  {" "}
                  {ethSendFee &&
                    ((Number(ethSendFee) * data?.length) / 1e18).toFixed(
                      4
                    )}{" "}
                  ETH
                </p>
              ) : (
                <p className="text-[#00a7ff]/50">
                  {tokenSendFee &&
                    ((Number(tokenSendFee) * data?.length) / 1e18).toFixed(
                      4
                    )}{" "}
                  ETH
                </p>
              )}
            </p>
            <p className="text-[#00a7ff]/50">Fee</p>
          </div>{" "}
          <div className="text-center p-4 border rounded-md border-[#00a7ff]/50">
            {native ? (
              <p>
                {ethBalance && (
                  <span>
                    {Number(ethBalance.displayValue).toFixed(5)}{" "}
                    {ethBalance.symbol}
                  </span>
                )}
                {isLoadingEthBalance && !ethBalance && (
                  <span className="animate-pulse text-xl -mb-1 "> • • •</span>
                )}
                {ethBalanceError && !isLoadingEthBalance && !ethBalance && (
                  <span>N/A</span>
                )}
              </p>
            ) : (
              <p>
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
              </p>
            )}
            {native ? (
              <p className="text-[#00a7ff]/50"> Wallet Balance</p>
            ) : (
              <p className="text-[#00a7ff]/50">Token Wallet Balance</p>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={() => setTab("preview")}
            className="w-full text-center px-2 py-1 rounded-md mt-3 bg-[#00a7ff] text-white"
          >
            Back
          </button>
          {native ? (
            <SendEth
              data={data}
              setTab={setTab}
              totalAmount={data
                .map((trxn) => trxn.amount)
                .reduce((acc, cur) => acc + cur, 0)}
              fee={Number(ethSendFee) * data.length}
            />
          ) : (
            <SendToken
              data={data}
              setTab={setTab}
              tokenContractAddress={tokenContractAddress}
              totalAmount={data
                .map((trxn) => trxn.amount)
                .reduce((acc, cur) => acc + cur, 0)}
              fee={Number(tokenSendFee) * data.length}
              decimal={tokenBalance?.decimals}
              symbol={tokenBalance.symbol}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Send;
