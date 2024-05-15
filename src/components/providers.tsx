import { AppShell, MantineProvider, createTheme } from "@mantine/core";
import { AppRouterProvider } from "./routes";

const theme = createTheme({
    defaultRadius: 'lg',
    primaryColor: 'orange',
    cursorType: 'pointer'
});

export const Providers = () => (
    <MantineProvider theme={theme}>
        <AppShell header={{ height: 60 }}>
            <AppRouterProvider/>
        </AppShell>
    </MantineProvider>
)