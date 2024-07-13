import {Avatar, Button, Group, Popover, Text} from "@mantine/core";
import {getModal, getUser, reconnectWallet} from "../utils/wallet";
import {ConnectWalletButton} from "./wallet_connect";
import {useEffect, useState} from "react";
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

    return (
        <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button>
                    <Group>
                        <Avatar size="sm" src={walletInfo?.icon} color="white"/>
                        <Text>{wallet}</Text>
                    </Group>
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Button onClick={() => getModal().open()}>Disconnect</Button>
            </Popover.Dropdown>
        </Popover>
    )
}