"use client";
import {
  shortenAddress,
  useAddress,
  useContract,
  useContractEvents,
} from "@thirdweb-dev/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { BiSolidReceipt } from "react-icons/bi";

function Page() {
  const { contract } = useContract(
    "0x8f3582084f1AfBB89ebCEe107339c78B3d8F83F5"
  );
  const address = useAddress();
  const userAddr = JSON.stringify(address);
  const { data: event } = useContractEvents(contract, "Sent_Bulk_ETH");
  const { data: allEvents } = useContractEvents(contract);

  console.log(allEvents);
  const { data: eventWithoutListener } = useContractEvents(
    contract,
    undefined,
    {
      subscribe: false,
    }
  );

  useEffect(() => {
    if (!address) {
      toast.info("Connect Wallet");
    }
  }, [address]);

  return (
    <section className="container mx-auto px-4  overflow-hidden my-24 text-xs ">
      {allEvents && (
        <div className="flex gap-4 flex-col mt-4">
          <div className="grid grid-cols-4 md:grid-cols-7 px-4">
            <span className="md:col-span-4">Sender</span>
            <span className="text-center">Recipients</span>
            <span className="text-center"> Total</span>
            <span className="text-end">Hash</span>
          </div>
          {allEvents
            .filter((event) => event.data.from === address)
            .map((event, index) => (
              <div
                key={index}
                className="grid grid-cols-4 md:grid-cols-7 border p-2 rounded-md px-4  "
              >
                <span className="md:col-span-4 md:inline-block hidden">
                  {address}
                </span>
                <span className=" md:hidden">{shortenAddress(address)}</span>

                <span className="text-center">{event.data.to.length}</span>
                <span className="text-center">
                  {event.eventName === "Sent_Bulk_Token"
                    ? Number(event.data.amount.toString()).toPrecision(2)
                    : Number(event.data.amount.toString() / 1e18).toPrecision(
                        2
                      )}
                  {event.eventName === "Sent_Bulk_Token" ? "Tokens" : "ETH"}
                </span>
                <a
                  target="_blank"
                  className="text-center flex justify-end"
                  href={`https://sepolia.etherscan.io/tx/${event?.transaction.transactionHash}`}
                >
                  <BiSolidReceipt size={20} />
                </a>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

export default Page;

//  {
//    allEvents && (
//      <div className="flex gap-4 flex-col mt-4">
//        {allEvents
//          .filter((event) => event.data.from === address)
//          .map((event, index) => (
//            <div
//              key={index}
//              className="grid-cols-3    grid border p-2 rounded-xl"
//            >
//              <div>{event.eventName}</div>
//              <div>
//                {event.data.amount.toString() / 1e18}{" "}
//                {event.eventName === "Sent_Bulk_Token" ? "Token" : "ETH"}{" "}
//              </div>
//              <Link
//                href={`https://sepolia.etherscan.io/tx/${event?.transaction.transactionHash}`}
//              >
//                View Transaction Hash
//              </Link>
//              {/* <div>{address}</div> */}
//              {/* <div>{event.data.from}</div> */}

//              <div className="col-span-3  mt-2 ">
//                <span className="uppercase font-semibold">To address</span>
//                {event.data.to.map((to, index) => (
//                  <div className="flex flex-col" key={index}>
//                    <div> {to}</div>
//                    {/* <div> {to}</div> <div> {to}</div> <div> {to}</div> */}
//                  </div>
//                ))}
//              </div>
//              {/* <div>{event.data.amount.toString() / 1e18} </div> */}
//            </div>
//          ))}
//      </div>
//    );
//  }
