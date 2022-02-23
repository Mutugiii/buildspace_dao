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
  // keep state while an nft is minting
  const [isClaiming, setIsClaiming] = useState(false);

  const signer = provider ? provider.getSigner() : undefined;

  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer])

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

  if(hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍅DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  const mintNFT = async () => {
    setIsClaiming(true);
    try {
      await bundleDropModule.claim("0", 1)
      setHasClaimedNFT(true);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
    } catch (error) {
      console.error("failed to claim", error);
    } finally {
      setIsClaiming(false)
    }
  } 

  return (
    <div className="mint-nft">
      <h1>Mint your free 🍅DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNFT()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
