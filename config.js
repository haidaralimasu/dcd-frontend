import { ethers } from "ethers";
import { DCD } from "./abis/DCD";
import { DCDPreSale } from "./abis/DCDPresSale";
import { USDT } from "./abis/USDT";

/*TESTNET*/
// export const usdtAddress = "0xB61Da7334046f2B962C12742061295E328fA0e46";
// export const dcdTokenAddress = "0xEC6cf22A5244cdbA68974097A552a345D68cfc56";
// export const dcdSaleAddress = "0xDCcB54222dD73D8Cac6933773Dc12471bC3b9aF3";

/*MAINNET*/
export const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const dcdTokenAddress = "0x0f55372B560401886B094b64058287B857c20d7A";
export const dcdSaleAddress = "0x3B79Bf954149c76445893D7AC5f5521EF8B4d277";

export const usdtInterface = new ethers.utils.Interface(USDT);
export const dcdTokenInterface = new ethers.utils.Interface(DCD);
export const dcdPresaleInterface = new ethers.utils.Interface(DCDPreSale);

export const infuraId = "d014af161a4b4ffbaa358366e232e2c8";

// export const rpcUrl =
//   "https://sepolia.infura.io/v3/d014af161a4b4ffbaa358366e232e2c8";

export const rpcUrl =
  "https://mainnet.infura.io/v3/d014af161a4b4ffbaa358366e232e2c8";
