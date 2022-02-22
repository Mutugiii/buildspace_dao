import { useEffect, useState, useMemo } from "react";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

// Instantiate sdk on rinkeby
const sdk = new ThirdwebSDK("rinkeby");

// Grab a ref to our erc-1115 contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0x287f34F5c7084a14Ab96f16864D602459524b97b"
);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address: ", address);

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(async () => {
    // No wallet connected
    if (!address) {
      return;
    }

    // Check if user has NFT
    const balance = await bundleDropModule.balanceOf(address, "0");

    try {
      // Check if bal is greater than 0
      if(balance.gt(0)) {
        setHasClaimedNFT(true);
        console.log("🌟 this user has a membership NFT!");
      } else {
        setHasClaimedNFT(false);
        console.log("😭 this user doesn't have a membership NFT.");
      }
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("failed to nft balance", error);
    }
  }, [address]);

  // Wallet not connected
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to TheDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  // Wallet connected
  return (
    <div className="landing">
      <h1>Wallet Connected, Welcome to My DAO 👀 </h1>
    </div>
  );
};

export default App;
