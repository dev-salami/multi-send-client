import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import SendEtherButton from "./SendEtherButton";
import { useContract, useContractRead } from "@thirdweb-dev/react";

const SendEther = ({
  ETHAddress,
  ETH_Amount,
  setETHAddress,
  setETH_Amount,
  ETH_Total,
  setETH_Total,
}) => {
  const { contract } = useContract(
    "0x8f3582084f1AfBB89ebCEe107339c78B3d8F83F5"
  );
  const { data: ethSendFee, isLoading: isLoadingEthSendFee } = useContractRead(
    contract,
    "ethSendFee"
  );
  const calculateTransactionValue = () => {
    if (
      ETH_Amount.length > 0 &&
      ETHAddress.length > 0 &&
      !isLoadingEthSendFee
    ) {
      const fee = ethSendFee.toNumber() * ETHAddress.length;
      const value = ETH_Amount.reduce((acc, cur) => Number(cur) + Number(acc));
      let total = fee + Number(value);
      console.log({ fee: fee, value: value, total: total });
      total = Number(total);
      setETH_Total(total);
    }
  };

  useEffect(() => {
    calculateTransactionValue();
  }, [ETH_Amount]);

  const handleAddETHAddress = () => {
    setETHAddress([...ETHAddress, ""]);
    setETH_Amount([...ETH_Amount, ""]);
  };

  const handleRemoveETHAddress = (index) => {
    if (ETHAddress.length > 1) {
      const newaddress = [...ETHAddress];
      newaddress.splice(index, 1);
      setETHAddress(newaddress);
    }
    if (ETH_Amount.length > 1) {
      const newamount = [...ETH_Amount];
      newamount.splice(index, 1);
      setETH_Amount(newamount);
    }
  };

  const handleETHAddressChange = (index, event) => {
    const newaddress = [...ETHAddress];
    newaddress[index] = event.target.value;
    setETHAddress(newaddress);
    console.log(ETHAddress);
  };
  const handleETHAmountChange = (index, event) => {
    const newamount = [...ETH_Amount];
    newamount[index] = (event.target.value * 1e18).toString();
    setETH_Amount(newamount);
  };

  return (
    <div className="flex flex-col gap-1">
      <div>
        {ETHAddress.map((data, index) => (
          <div key={index} className="flex gap-4 items-center mb-2">
            <input
              type="text"
              className="border border-black rounded-md py-1 px-2 text-gray-900 w-full"
              placeholder="Enter Address"
              value={data}
              onChange={(e) => handleETHAddressChange(index, e)}
            />
            <input
              type="number"
              className="border border-black rounded-md py-1 px-2 text-gray-900 w-full"
              placeholder="Enter Amount"
              value={data}
              onChange={(e) => handleETHAmountChange(index, e)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-black text-white rounded"
              onClick={() => handleRemoveETHAddress(index)}
            >
              <MdDelete />
            </button>
          </div>
        ))}
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            className=" bg-black text-white w-full font-semibold py-1 px-3 rounded-md"
            onClick={handleAddETHAddress}
          >
            Add more address field
          </button>
          <SendEtherButton
            AddressList={ETHAddress}
            AmountList={ETH_Amount}
            totalAmount={ETH_Total}
          />
          <div>{`${
            ETH_Amount.reduce((acc, cur) => Number(cur) + Number(acc)) / 1e18
          } ETH TO ${ETHAddress.length} ${
            ETHAddress.length === 1 ? "Address" : "Addresses"
          } `}</div>
          <div>{`Transaction Fee : ${
            isLoadingEthSendFee ? 0 : (ethSendFee * ETHAddress.length) / 1e18
          } ETH `}</div>
        </div>
      </div>
    </div>
  );
};

export default SendEther;
