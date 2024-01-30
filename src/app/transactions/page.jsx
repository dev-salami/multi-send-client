"use client";
import {
  useAddress,
  useContract,
  useContractEvents,
} from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

function Page() {
  const { contract } = useContract(
    "0x8f3582084f1AfBB89ebCEe107339c78B3d8F83F5"
  );
  const address = useAddress();
  const userAddr = JSON.stringify(address);
  const { data: event } = useContractEvents(contract, "Sent_Bulk_ETH");
  const { data: allEvents } = useContractEvents(contract);
  const { data: eventWithoutListener } = useContractEvents(
    contract,
    undefined,
    {
      subscribe: false,
    }
  );
  return (
    <section className="container mx-auto px-4  overflow-hidden ">
      {allEvents && (
        <div className="flex gap-4 flex-col mt-4">
          {allEvents
            .filter((event) => event.data.from === address)
            .map((event, index) => (
              <div
                key={index}
                className="grid-cols-3    grid border p-2 rounded-xl"
              >
                <div>{event.eventName}</div>
                <div>
                  {event.data.amount.toString() / 1e18}{" "}
                  {event.eventName === "Sent_Bulk_Token" ? "Token" : "ETH"}{" "}
                </div>
                <Link
                  href={`https://sepolia.etherscan.io/tx/${event?.transaction.transactionHash}`}
                >
                  View Transaction Hash
                </Link>
                {/* <div>{address}</div> */}
                {/* <div>{event.data.from}</div> */}

                <div className="col-span-3  mt-2 ">
                  <span className="uppercase font-semibold">To address</span>
                  {event.data.to.map((to, index) => (
                    <div className="flex flex-col" key={index}>
                      <div> {to}</div>
                      {/* <div> {to}</div> <div> {to}</div> <div> {to}</div> */}
                    </div>
                  ))}
                </div>
                {/* <div>{event.data.amount.toString() / 1e18} </div> */}
              </div>
            ))}
        </div>
      )}
      {allEvents && <div>{JSON.stringify(allEvents[2])}</div>}
    </section>
  );
}

export default Page;
