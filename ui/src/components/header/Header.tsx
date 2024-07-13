import React from 'react';
import {Anchor, Box, Button, Container, Group} from '@mantine/core';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import {User} from "../user";
import {IconPlus} from "@tabler/icons-react";

function Header() {
    return (
        <Box component="header" className={styles.header}>
            <Container className={styles.container}>
                <Anchor component={Link} to="/" className={styles.logo}>
                    Demeter
                </Anchor>
                <Group className={styles.nav}>
                    <Anchor component={Link} to="/explore">
                        Explore
                    </Anchor>
                    <Anchor component={Link} to="/analytics">
                        Analytics
                    </Anchor>
                    <Anchor component={Link} to="/chat">
                        Chat with Demeter !
                    </Anchor>
                </Group>
                <Group className={styles.nav}>
                    <Button component={Link} to="/create" radius="lg">
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