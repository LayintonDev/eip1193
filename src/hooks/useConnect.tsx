import { useEffect, useState } from "react"
import { formatBalance } from "../utils"

export const useConnect = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [accounts, setaccounts] = useState<string>("")
    const [networks, setnetworks] = useState<string>("")
    const [accBal, setaccBal] = useState<string>("")

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
    const makeConnection = async () => {

        if (window.ethereum) {
            try {

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setaccounts(accounts[0]);


                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                setnetworks(chainId);
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

            setaccBal(formatBalance(balance))
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        const handleAccountChanged = async (accounts: string[]) => {
            if (accounts.length === 0) {
                alert("Please connect to MetaMask.");
                setaccounts("");
            } else {
                setaccounts(accounts[0]);
            }
        }
        const handleOnConnected = () => {
            console.log("connected")
            setIsConnected(true)
        }

        const handleDisconnect = () => {
            console.log("disconnect")
            setIsConnected(false)

        }
        const handleNetworkChange = (chainId: string) => {
            setnetworks(chainId);
        };

        if (window.ethereum) {

            window.ethereum.on('accountsChanged', handleAccountChanged);

            window.ethereum.on('chainChanged', handleNetworkChange);
            window.ethereum.on('connect', handleOnConnected);
            window.ethereum.on('disconnect', handleDisconnect);


        }
        return () => {

            window.ethereum.removeListener!('accountsChanged', handleAccountChanged);

            window.ethereum.removeListener!('chainChanged', handleNetworkChange);
            window.ethereum.removeListener!('disconnect', handleDisconnect);
            window.ethereum.removeListener!('connect', handleOnConnected);
        }
    }, []);
    return { accounts, networks, makeConnection, addNetwork, isConnected, checkWalletBal, accBal }
}