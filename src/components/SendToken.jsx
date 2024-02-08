import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import Loader from "./Loader";
import SendTokenButton from "./SendTokenButton";

const SendToken = ({
  TokenAddress,
  Token_Amount,
  setTokenAddress,
  setToken_Amount,
  Token_Contract_Address,
  setToken_Contract_Address,
  totalToken_Amount,
  setTotalToken_Amount,
}) => {
  const address = useAddress();
  const { contract: tokenContract } = useContract(Token_Contract_Address);
  const { contract } = useContract(
    "0x8f3582084f1AfBB89ebCEe107339c78B3d8F83F5"
  );

  const { data: tokenSendFee, isLoading: tokenSendFeeLoading } =
    useContractRead(contract, "tokenSendFee");

  const {
    data: tokenBalance,
    isLoading: isLoadingTokenBalance,
    error,
  } = useTokenBalance(tokenContract, address);
  const calculateTotalToken = () => {
    if (
      Token_Amount.length > 0 &&
      TokenAddress.length > 0 &&
      !tokenSendFeeLoading
    ) {
      const value = Token_Amount.reduce(
        (acc, cur) => Number(cur) + Number(acc)
      );

      setTotalToken_Amount(Number(value) / 1e18);

      console.log({ value: totalToken_Amount, total: Token_Amount });
    }
  };

  useEffect(() => {
    calculateTotalToken();
  }, [Token_Amount]);
  const handleAddTokenAddress = () => {
    setTokenAddress([...TokenAddress, ""]);
    setToken_Amount([...Token_Amount, ""]);
  };

  const handleRemoveTokenAddress = (index) => {
    if (TokenAddress.length > 1) {
      const newaddress = [...TokenAddress];
      newaddress.splice(index, 1);
      setTokenAddress(newaddress);
    }
    if (Token_Amount.length > 1) {
      const newamount = [...Token_Amount];
      newamount.splice(index, 1);
      setToken_Amount(newamount);
    }
  };

  const handleTokenAddressChange = (index, event) => {
    const newaddress = [...TokenAddress];
    newaddress[index] = event.target.value;
    setTokenAddress(newaddress);
  };
  const handleTokenAmountChange = (index, event) => {
    const newamount = [...Token_Amount];
    newamount[index] = (Number(event.target.value) * 1e18).toString();
    setToken_Amount(newamount);
  };

  return (
    <div className="flex flex-col gap-1">
      <div>
        {error && <span>Error</span>}

        <> {isLoadingTokenBalance && <Loader />}</>
        <>
          {tokenBalance && (
            <div className="flex gap-1">
              <span>Balance</span>:<span></span>
              <span className="text-xs sm:text-base">
                {Number(tokenBalance.displayValue).toFixed(5)}
                {tokenBalance.symbol}
                {/* {JSON.stringify(tokenBalance.decimals)} */}
              </span>
            </div>
          )}
        </>
      </div>
      <input
        type="text"
        value={Token_Contract_Address}
        onChange={(e) => setToken_Contract_Address(e.target.value)}
        className="border border-black mb-4 rounded-md py-1 px-2 text-gray-900 w-full"
        placeholder="Token Address"
      />

      <div>
        {TokenAddress.map((field, index) => (
          <div key={index} className="flex gap-4 items-center mb-2">
            <input
              type="text"
              className="border border-black rounded-md py-1 px-2 text-gray-900 w-full"
              placeholder="Enter Address"
              value={field}
              onChange={(e) => handleTokenAddressChange(index, e)}
            />
            <input
              type="number"
              className="border border-black rounded-md py-1 px-2 text-gray-900 w-full"
              placeholder="Enter Amount"
              value={String(Token_Amount[index] / 1e18)}
              onChange={(e) => handleTokenAmountChange(index, e)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-black text-white rounded"
              onClick={() => handleRemoveTokenAddress(index)}
            >
              <MdDelete />
            </button>
          </div>
        ))}
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            className=" bg-black text-white w-full font-semibold py-1 px-3 rounded-md"
            onClick={handleAddTokenAddress}
          >
            Add more address field
          </button>

          <SendTokenButton
            AddressList={TokenAddress}
            tokenAmountList={Token_Amount}
            tokenContractAddress={Token_Contract_Address}
            totalToken_Amount={totalToken_Amount}
            fee={(Number(tokenSendFee) * TokenAddress.length) / 1e18}
          />
          <div>
            <span>Total Token</span> <span> : </span>
            <span>
              {totalToken_Amount} {tokenBalance?.symbol}
            </span>
          </div>
        </div>
        {!tokenSendFeeLoading && (
          <div className="mt-2">{`Transaction Fee :  ${
            tokenSendFee * TokenAddress.length
          }`}</div>
        )}
        <>
          {tokenBalance?.symbol === "KSA" && (
            <p>
              Note : This contract was deployed on sepolia testnets, It only
              work with TOKENS deployed on the sepolia testnet. If you wish to
              test with my token (KSA Token) Get some test token HERE
            </p>
          )}
        </>
      </div>
    </div>
  );
};

export default SendToken;
