"use client";

import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>Streamline your crypto transactions with multisender</h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {` Send tokens or ETH to numerous addresses in a single transaction,ensuring secure transfers, saving you time and gas fees.`}
          </p>

          <div className="w-fit mx-auto">
            <Link
              href="/send"
              className="py-2 px-8 border flex justify-center rounded-md  "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
