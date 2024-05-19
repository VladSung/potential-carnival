import { ActionIcon, Group, Menu, Paper, PaperProps } from "@mantine/core";
import { PropsWithChildren, useContext } from "react";
import { ThemeToggler } from "../../features/theme-toggler";
import { IconSettings, IconToggleLeft, IconToggleRightFilled } from "@tabler/icons-react";
import { PokeAnimationContext } from "../../shared/contexts/animation-disabled-context";

export const NavigationBottom = ({ children, ...props }: PaperProps & PropsWithChildren) => {
    const { animationDisabled, setAnimationDisabled } = useContext(PokeAnimationContext)

    return (
        <Paper mx='md' mah={80} pos='sticky' withBorder style={{ zIndex: 3, bottom: 8, left: 24, right: 24 }} {...props}>
            <Group p='md'>
                {children}
                <Menu>
                    <Menu.Target>
                        <ActionIcon size='lg' variant="default" ml='auto'><IconSettings size={16} /></ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <ThemeToggler ml='auto' />
                        <Menu.Item onClick={() => setAnimationDisabled(!animationDisabled)} leftSection={animationDisabled ? <IconToggleRightFilled color="var(--mantine-primary-color-filled)" /> : <IconToggleLeft />}>Disable pokeball animation</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Paper>
    )
}