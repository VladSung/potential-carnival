import { MenuItem, MenuItemProps, useMantineColorScheme } from "@mantine/core"
import { IconSunMoon } from "@tabler/icons-react"

export const ThemeToggler = (props: MenuItemProps) => {

    const { toggleColorScheme } = useMantineColorScheme()

    return (
        <MenuItem variant='default' leftSection={<IconSunMoon size={14} />} onClick={toggleColorScheme} {...props}>Toggle theme</MenuItem>
    )
}