import Image from "next/image";
import React from "react";
import congratulation from "../../public/congratulation.png";
import Link from "next/link";

function TransactionSuccess({ hash }) {
  return (
    <section className=" text-white fixed inset-0 z-50 bg-black/90  backdrop-blur-sm">
      <div className="h-full flex justify-center items-center">
        <div className="max-w-md border  border-[#D434FE]   rounded-md mx-auto flex flex-col  items-center">
          <div>
            <Image
              className="  w-fit"
              src={congratulation}
              alt="big-idea"
            ></Image>
          </div>
          <div className="text-center flex flex-col gap-4 p-4">
            <p>Transaction Successful</p>
            <a
              className="  py-[6px] border bg-black rounded-md w-full px-6"
              href={`https://sepolia.etherscan.io/tx/${hash}`}
            >
              View transaction details
            </a>
            <Link
              className="  py-[6px] border bg-black rounded-md w-full px-6"
              href="/"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransactionSuccess;
