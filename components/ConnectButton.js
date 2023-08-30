import { useEthers, shortenAddress } from "@usedapp/core";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";
import { ethers } from "ethers";
import { rpcUrl } from "@/config";

const ConnectButton = (props) => {
  const { account, activate, deactivate, chainId, switchNetwork } = useEthers();

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          rpc: rpcUrl,
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {account ? <button onClick={() => deactivate()} className="btn btn-outline-primary mx-2">Disconnect {account}</button> : <button onClick={() => activateProvider()} className="btn btn-outline-primary mx-2">Connect Wallet</button>} */}
      {account ? (
        <button onClick={() => deactivate()} className={props.classes}>
          Disconnect [{shortenAddress(account)}]
        </button>
      ) : (
        <button onClick={() => activateProvider()} className={props.classes}>
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectButton;
