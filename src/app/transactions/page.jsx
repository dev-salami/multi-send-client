"use client";
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

function Page() {
  const { contract } = useContract(
    "0x8f3582084f1AfBB89ebCEe107339c78B3d8F83F5"
  );
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
    <section className="container mx-auto px-4">
      {allEvents && (
        <>
          {allEvents.map((event, index) => (
            <div key={index} className="grid-cols-2   grid">
              <div>Sent Bulk Token</div>
              <div>
                {event.data.to.map((to, index) => (
                  <div className="flex flex-col" key={index}>
                    <div> {to}</div>
                    {/* <div> {to}</div> <div> {to}</div> <div> {to}</div> */}
                  </div>
                ))}
              </div>
              <div>{event.data.amount.toString() / 1e18} </div>
              <Link
                href={`https://sepolia.etherscan.io/tx/${event?.transaction.transactionHash}`}
              >
                View
              </Link>
            </div>
          ))}
        </>
      )}
      {allEvents && <div>{JSON.stringify(allEvents[2])}</div>}
    </section>
  );
}

export default Page;
