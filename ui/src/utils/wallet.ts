import {arbitrum, mainnet} from "viem/chains";
import {createWeb3Modal, defaultWagmiConfig, Web3Modal} from "@web3modal/wagmi";
import {getAccount, reconnect} from "@wagmi/core";

const projectId = '38b138dc1c7d30ccbf769b62f92a3eef'

const metadata = {
    name: 'Demeter',
    description: 'Web3Modal Example',
    url: 'http://localhost:3000', // origin must match your domain & subdomain.
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum] as const
export const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
})

let modal: Web3Modal | undefined = undefined

export function getModal(): Web3Modal {
    if (modal) {
        return modal
    }

    modal = createWeb3Modal({
        wagmiConfig,
        projectId,
    });

    return modal
}

export function getWalletInfo() {
    return getModal().getWalletInfo()
}

export function getUser() {
    const walletInfo = getWalletInfo()
    const account = getAccount(wagmiConfig);
    return {account, walletInfo}
}

export function reconnectWallet() {
    return reconnect(wagmiConfig)
}
