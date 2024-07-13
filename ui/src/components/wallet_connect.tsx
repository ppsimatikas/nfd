import {getModal} from '../utils/wallet'
import {Button} from "@mantine/core";
import {toastError} from "./ui-toast";

export function ConnectWalletButton() {
    return (
        <Button w={150} onClick={() =>
            getModal().open().catch((e: any) => toastError(e))
        }>
            Connect Wallet
        </Button>
    )
}