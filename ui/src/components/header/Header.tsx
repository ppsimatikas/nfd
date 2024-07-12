import { Anchor, Box } from "@mantine/core";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Box pb={120}>
      <header>
        <Anchor component={Link} to="/">
          Home
        </Anchor>
        <Anchor component={Link} to="/about">
          About
        </Anchor>
      </header>
    </Box>
  );
}
