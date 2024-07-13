import {Avatar, Button, Group, Popover, Text} from "@mantine/core";
import {getModal, getUser} from "../utils/wallet";

export function User() {
    const {walletInfo, account} = getUser()
    const w = account.address ?? ''
    const firstFour = w.substring(0, 4)
    const lastFour = w.substring(w.length - 4, w.length)
    const wallet = `${firstFour}...${lastFour}`

    return (
        <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button size="lg">
                    <Group>
                        <Avatar src={walletInfo?.icon}/>
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