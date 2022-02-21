import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x562024c07635e7D8A1f4753aEb39aCc88F9D3213");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "FarmerDAO",
      description: "A DAO for yield farmers",
      image: readFileSync('scripts/assets/farmer.jpg'),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );

    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );

  } catch (err) {
    console.error("Failed to Deploy bundleDrop module", err);
  }
})();