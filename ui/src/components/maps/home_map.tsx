import {Box} from "@mantine/core";
import {LanduseMap} from "./landuse_map";

export function HomeMap() {
    return (
        <Box style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // Ensure it stays in the background
        }}>
            <LanduseMap/>
        </Box>
    )
}