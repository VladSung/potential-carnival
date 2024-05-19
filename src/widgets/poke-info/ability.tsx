import { Loader, Popover, PopoverDropdownProps } from "@mantine/core"
import { useFetch } from "@mantine/hooks"

type AbilityInfoResult = {
    effect_entries: [{ language: { name: string }, short_effect: string }],
    flavor_text_entries: { flavor_text: string, language: { name: string } }[]
}

type AbilityInfoProps = {
    url: string
} & PopoverDropdownProps


export const AbilityInfo = ({ url, ...props }: AbilityInfoProps) => {
    const { loading, data } = useFetch<AbilityInfoResult>(url)


    const ability = data?.effect_entries?.find(eff => eff.language.name === 'en')
    const flavorText = data?.flavor_text_entries?.find(eff => eff.language.name === 'en')?.flavor_text || data?.flavor_text_entries?.[0]?.flavor_text

    return (
        <Popover.Dropdown {...props}>
            {loading
                ? <Loader />
                :
                ability?.short_effect ?? flavorText
            }
        </Popover.Dropdown>
    )
}