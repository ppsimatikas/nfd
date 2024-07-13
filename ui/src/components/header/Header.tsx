import {Anchor} from "@mantine/core";
import {Link} from "react-router-dom";

export function Header() {
    return (
        <header>
            <Anchor component={Link} to="/">
                Home
            </Anchor>
            <Anchor component={Link} to="/about">
                About
            </Anchor>
        </header>
    )
}
