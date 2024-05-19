import { AppShellMain } from "@mantine/core";

import { Container, Title, Text, Button, Group } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <AppShellMain>
            <Container className={classes.root}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title ta='center' size='128' component='div'>404</Title>
                        <Title className={classes.title}>Nothing to see here</Title>
                        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                            Page you are trying to open does not exist. You may have mistyped the address, or the
                            page has been moved to another URL. If you think this is an error contact support.
                        </Text>
                        <Group justify="center">
                            <Button component={Link} to="/" size="md">Take me back to home page</Button>
                        </Group>
                    </div>
                </div>
            </Container>
        </AppShellMain>

    );
}