import { createContext, useState } from "react"


export const WalletContext = createContext<{
    account: string;
    networks: string;
    isConnected: boolean;
    setConnectionDetails: React.Dispatch<React.SetStateAction<{
        account: string;
        networks: string;
        isConnected: boolean;
    }>>
}>({
    account: "",
    networks: "",
    isConnected: false,
    setConnectionDetails: () => { },
})


export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [connectionDetails, setConnectionDetails] = useState<{
        account: string;
        networks: string;
        isConnected: boolean;
    }>({
        account: "",
        networks: "",
        isConnected: false,
    });



    return (
        <WalletContext.Provider value={{
            account: connectionDetails.account,
            networks: connectionDetails.networks,
            isConnected: connectionDetails.isConnected,
            setConnectionDetails
        }}>
            {children}
        </WalletContext.Provider>
    );
}

