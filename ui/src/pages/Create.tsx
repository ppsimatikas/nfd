import {useEffect, useState} from "react";
import {ConnectWalletButton} from "../components/wallet_connect";
import {getModal, getUser, reconnectWallet} from "../utils/wallet";
import Upload from "../components/upload";
import {UiLoader} from "../components/loader";
import {Center, Stack, Text, Title} from "@mantine/core";

function Create() {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<any>(undefined);
    const account = getUser().account

    getModal().subscribeState(setState)

    useEffect(() => {
        reconnectWallet().finally(() => setLoading(false))
    }, [state]);

    if (loading) {
        return <UiLoader/>
    }

    if (!account.isConnected) {
        return (
            <Stack h="500" pt={100}>
                <Title>Verification Required</Title>
                <Text>We need to verify you before you can enhance Demeter's knowledge with your data</Text>
                <Center>
                    <ConnectWalletButton/>
                </Center>
            </Stack>
        )
    }

    return (
        <Stack>
            <Title>Enhance Demeter's knowledsge !</Title>
            <Text>Add your very own dataset in Demeter...</Text>
            <Upload/>
        </Stack>
    )
}

export default Create;
