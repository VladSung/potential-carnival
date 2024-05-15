import { Loader, Popover} from "@mantine/core"
import { useFetch } from "@mantine/hooks"

export const AbilityInfo = ({url}:{url:string}) => {
    const { loading, data } = useFetch<{effect_entries:[{language:{name:string}, short_effect:string}]}>(url)


    const ability = data?.effect_entries?.find(eff=>eff.language.name === 'en')

    return (
        <Popover.Dropdown>
            {loading
                ? <Loader />
                : 
                    ability?.short_effect
            }
        </Popover.Dropdown>
    )
}