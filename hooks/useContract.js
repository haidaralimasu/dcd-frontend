import { dcdSaleAddress } from "../config";
import { ethers } from "ethers";
import { DCDPreSale } from "@/abis/DCDPresSale";
import { useCall } from "@usedapp/core";


const dcdPreSaleInterface = new ethers.utils.Interface(DCDPreSale);

export const useUsdtPrice = () => {
    const { value, error } =
        useCall({
            contract: new ethers.Contract(dcdSaleAddress, dcdPreSaleInterface),
            method: "s_usdtPrice",
            args: [],
        }) ?? {};
    if (error) {
        console.log(error.message);
        return undefined;
    }
    return value?.[0];
};

export const useTotalRaisedUSDT = () => {
    const { value, error } =
        useCall({
            contract: new ethers.Contract(dcdSaleAddress, dcdPreSaleInterface),
            method: "s_totalUSDTRaised",
            args: [],
        }) ?? {};
    if (error) {
        console.log(error.message);
        return undefined;
    }
    return value?.[0];
};

export const useETHToDCD = (ethAmount) => {
    const { value, error } =
        useCall({
            contract: new ethers.Contract(dcdSaleAddress, dcdPreSaleInterface),
            method: "ETH_DCD",
            args: [ethAmount ? ethers.utils.parseUnits(ethAmount, "ether") : "0"],
        }) ?? {};
    if (error) {
        console.log(error.message);
        return undefined;
    }
    return value?.[0];
};

export const useUSDTToDCD = (usdt) => {
    const { value, error } =
        useCall({
            contract: new ethers.Contract(dcdSaleAddress, dcdPreSaleInterface),
            method: "USDT_DCD",
            args: [usdt ? usdt * 1000000 : "0"],
        }) ?? {};
    if (error) {
        console.log(error.message);
        return undefined;
    }
    return value?.[0];
};

export const useGetInvestmentByAddress = (user) => {
    const { value, error } =
        useCall({
            contract: new ethers.Contract(dcdSaleAddress, dcdPreSaleInterface),
            method: "s_investemetByAddress",
            args: [user],
        }) ?? {};
    if (error) {
        console.log(error.message);
        return undefined;
    }
    return value?.[0];
};