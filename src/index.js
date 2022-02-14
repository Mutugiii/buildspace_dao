import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

// Supported chains - 4=rinkeby
const supportedChainIds = [4];

// Wallet to support - Metamask
const connectors = {
  injected: {},
};


// Render the App component to the DOM
// Wrap app with 3rdweb provider
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
