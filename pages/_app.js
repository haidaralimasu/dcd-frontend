import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { rpcUrl } from "@/config";
import { DAppProvider, Mainnet } from "@usedapp/core";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: rpcUrl,
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <DAppProvider config={config}>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
        <Footer />
      </DAppProvider>
    </>
  );
}
