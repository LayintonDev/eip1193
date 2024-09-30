import { useContext, useEffect, useState } from "react"
import { formatBalance } from "../utils"
import { WalletContext } from "../context/walletContext"

export const useConnect = () => {

    const { setConnectionDetails } = useContext(WalletContext)
    const [accBal, setaccBal] = useState<string>("")
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountChanged);
            window.ethereum.on('chainChanged', handleNetworkChange);
            window.ethereum.on('connect', handleOnConnected);
            window.ethereum.on('disconnect', handleDisconnect);
        }
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountChanged);
            window.ethereum.removeListener('chainChanged', handleNetworkChange);
            window.ethereum.removeListener('disconnect', handleDisconnect);
            window.ethereum.removeListener('connect', handleOnConnected);
        }
    }, []);
    const makeConnection = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                setConnectionDetails({ account: accounts[0], networks: chainId, isConnected: true })
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("Please install MetaMask or another injected wallet");
        }

    }

    const checkWalletBal = async (address: string) => {
        try {

            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [
                    address,
                ]
            })
            return balance
        } catch (error) {
            console.log(error)
            return null
        }


    }

    const addNetwork = async () => {
        try {

            await window.ethereum
                .request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0xa4b1" }],
                })
        } catch (switchError: any) {
            console.log(switchError.code)
            if (switchError.code === 4902) {
                try {

                    await window.ethereum
                        .request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0xa4b1",
                                    chainName: "Arbitrum One",
                                    rpcUrls: ["https://arbitrum.llamarpc.com"],
                                    nativeCurrency: {
                                        name: "ETH",
                                        symbol: "ETH",
                                        decimals: 18,
                                    }

                                },
                            ],
                        })
                    alert("Added network")
                } catch (addError) {
                    alert("an error occured")
                    console.error(addError)
                }
            }

        }
    }

    const handleAccountChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
            alert("Please connect to MetaMask.");
            setConnectionDetails((prev) => ({ ...prev, account: "" }));
        } else {
            setConnectionDetails((prev) => ({ ...prev, account: accounts[0] }));
        }
    }
    const handleOnConnected = () => {
        console.log("connected")
        setConnectionDetails((prev) => ({ ...prev, isConnected: true }));
    }

    const handleDisconnect = () => {
        console.log("disconnect")
        setConnectionDetails((prev) => ({ ...prev, isConnected: false }));

    }
    const handleNetworkChange = (chainId: string) => {
        setConnectionDetails((prev) => ({ ...prev, networks: chainId }));
    };




    return { makeConnection, addNetwork, checkWalletBal, accBal }
}