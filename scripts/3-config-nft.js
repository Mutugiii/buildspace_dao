import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x287f34F5c7084a14Ab96f16864D602459524b97b",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Tomato cluster",
        description: "This NFT gives access to farmerDAO",
        image: readFileSync("scripts/assets/tomato.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (err) {
    console.error("Failed to create new NFT", err);
  }
})()