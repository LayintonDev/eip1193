import { useContext, useState } from "react";
import { useConnect } from "../hooks/useConnect";
import { formatChainAsNum } from "../utils";
import { WalletContext } from "../context/walletContext";

export const DiscoverWalletProviders = () => {
    const { account, networks, isConnected } = useContext(WalletContext)
    const { makeConnection, addNetwork, checkWalletBal } = useConnect()
    const [address, setAddress] = useState<string>("")
    const [accBal, setaccBal] = useState<string | null>("")
    return (
        <>
            <h2>Testing EIP 1993:</h2>
            <div>
                {!account && <button onClick={makeConnection}>Connect Wallet</button>}
                {account && <button onClick={addNetwork}>Add Chain</button>}

                <p>Is connected: {isConnected ? "true" : "false"}</p>
                <p>Wallet Adrress: {account}</p>
                {networks && <p>Chain id: {formatChainAsNum(networks)}</p>}


                <label htmlFor="">Enter wallet address</label>
                <input style={{
                    margin: "0 10px",
                    padding: "5px"
                }} value={address} onChange={(e) => setAddress(e.target.value)} />
                <button onClick={async () => setaccBal(await checkWalletBal(address))}>Get wallet balance</button>
                {
                    accBal && <h6 style={{
                        fontSize: "20px"
                    }}>Balance: {accBal ?? "N/A"} ETH on chain {formatChainAsNum(networks)}</h6>
                }

            </div>
            <hr />

        </>
    )
}

// 0x596BB27ceF5e94aEcA5Ba50E41Db077b1c23068B
// 0xfd558120f12c855ba1c31e157741d39650bd5da9