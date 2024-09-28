import { useState } from "react";
import { useConnect } from "../hooks/useConnect";
import { formatChainAsNum } from "../utils";

export const DiscoverWalletProviders = () => {
    const { accounts, networks, makeConnection, isConnected, addNetwork, checkWalletBal, accBal } = useConnect()
    const [address, setAddress] = useState<string>("")
    return (
        <>
            <h2>Testing EIP 1993:</h2>
            <div>
                {!accounts && <button onClick={makeConnection}>Connect Wallet</button>}
                {accounts && <button onClick={addNetwork}>Add Chain</button>}

                {/* <p>Is connected: {isConnected ? "true" : "false"}</p> */}
                <p>Wallet Adrress: {accounts}</p>
                {networks && <p>Chain id: {formatChainAsNum(networks)}</p>}


                <label htmlFor="">Enter wallet address</label>
                <input style={{
                    margin: "0 10px",
                    padding: "5px"
                }} value={address} onChange={(e) => setAddress(e.target.value)} />
                <button onClick={() => checkWalletBal(address)}>Get wallet balance</button>
                {
                    accBal && <h6 style={{
                        fontSize: "20px"
                    }}>Balance: {accBal} ETH on chain {formatChainAsNum(networks)}</h6>
                }

            </div>
            <hr />

        </>
    )
}