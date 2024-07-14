import React from 'react';
import {Anchor, Box, Button, Container, Group, Image} from '@mantine/core';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import {User} from "../user";
import {IconMessages, IconPlus, IconTerminal, IconTimeline} from "@tabler/icons-react";

function Header() {
    return (
        <Box component="header" className={styles.header}>
            <Container className={styles.container}>
                <Anchor component={Link} to="/" className={styles.logo}>
                    <Image src="logo.png" alt="Logo" width={40} height={40}/>
                </Anchor>
                <Group className={styles.nav}>
                    <Button component={Link} to="/explore" className={styles.navButton} radius="lg">
                        <Group gap={4}><IconTerminal/>Explore</Group>
                    </Button>
                    <Button component={Link} to="/analytics" className={styles.navButton} radius="lg">
                        <Group gap={4}><IconTimeline/>Analytics</Group>
                    </Button>
                    <Button component={Link} to="/chat" className={styles.navButton} radius="lg">
                        <Group gap={4}><IconMessages/>AI Agent</Group>
                    </Button>
                </Group>
                <Group className={styles.nav}>
                    <Button component={Link} to="/create" radius="lg" color="#260046">
                        <Group gap={5}>
                            <IconPlus/> Create
                        </Group>
                    </Button>
                    <User/>
                </Group>
            </Container>
        </Box>
    );
}

export default Header;