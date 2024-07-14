import {Avatar, Button, Group, Text} from "@mantine/core";
import {getModal, getUser, reconnectWallet} from "../utils/wallet";
import {ConnectWalletButton} from "./wallet_connect";
import {useEffect, useState} from "react";
import {toastError} from "./ui-toast";
import {UiLoader} from "./loader";

export function User() {
    const [state, setState] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);

    getModal().subscribeState(setState)

    useEffect(() => {
        reconnectWallet().finally(() => setLoading(false))
    }, [state]);

    if (loading) {
        return <UiLoader/>
    }

    const {walletInfo, account} = getUser()

    if (!account.isConnected) {
        return <ConnectWalletButton/>
    }

    const w = account.address ?? ''
    const firstFour = w.substring(0, 4)
    const lastFour = w.substring(w.length - 4, w.length)
    const wallet = `${firstFour}...${lastFour}`

    const handleButtonClick = () => {
        getModal().open().catch((e: any) => toastError(e));
    };

    return (
        <Button onClick={handleButtonClick}>
            <Group>
                <Avatar size="sm" src={walletInfo?.icon} color="white"/>
                <Text>{wallet}</Text>
            </Group>
        </Button>
    )
}