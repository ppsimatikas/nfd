import {useEffect, useState} from "react";
import {ConnectWalletButton} from "../components/wallet_connect";
import {getModal, getUser, reconnectWallet} from "../utils/wallet";
import Upload from "../components/upload";
import {UiLoader} from "../components/loader";
import {User} from "../components/user";

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
        return <ConnectWalletButton/>
    }

    return <>
        <User/>
        <Upload/>
    </>
}

export default Create;
