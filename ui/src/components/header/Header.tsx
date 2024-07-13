import React from 'react';
import { Box, Container, Group, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <Box component="header" className={styles.header}>
      <Container className={styles.container}>
        <Anchor component={Link} to="/" className={styles.logo}>
          Demeter
        </Anchor>
        <Group className={styles.nav}>
          <Anchor component={Link} to="/onboard" className={styles.navLink}>
            Create
          </Anchor>
        </Group>
      </Container>
    </Box>
  );
}

export default Header;