import { useEffect, useState, useMemo } from "react";

import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address: ", address);

  // Wallet not connected
  if(!address) {
    return (
      <div className="landing">
        <h1>Welcome to TheDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    )
  }

  // Wallet connected
  return (
    <div className="landing">
      <h1>Wallet Connected, Welcome to My DAO 👀 </h1>
    </div>
  );
};

export default App;
