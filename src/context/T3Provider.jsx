"use client";
import { Sepolia } from "@thirdweb-dev/chains";

import { ThirdwebProvider } from "@thirdweb-dev/react";

export function T3Provider({ children }) {
  const activeChain = "ethereum";

  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
}
