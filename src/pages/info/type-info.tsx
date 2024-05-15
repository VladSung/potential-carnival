import { Text, Loader, Popover, Pill, Stack, PillGroup } from "@mantine/core"
import { useFetch } from "@mantine/hooks"

type TypeInfoResult = {
    damage_relations: {
        double_damage_from: {
            name: string;
        }[],
        double_damage_to: {
            name: string;
        }[],
        half_damage_from: {
            name: string;
        }[],
        half_damage_to: {
            name: string;
        }[]
    }
}

export const TypeInfo = ({ url }: { url: string }) => {
    const { loading, data } = useFetch<TypeInfoResult>(url)


    const damageRelations = data?.damage_relations

    return (
        <Popover.Dropdown>
            {loading
                ? <Loader />
                :
                <Stack gap='sm'>
                    <Text>Damage x2 from:</Text>
                    <PillGroup>
                        {damageRelations?.double_damage_from.map(dmg => <Pill  c='red' key={dmg.name}>{dmg.name}</Pill>)}
                    </PillGroup>
                    <Text>Damage x2 to:</Text>
                    <PillGroup>
                        {damageRelations?.double_damage_from.map(dmg => <Pill c='blue' key={dmg.name}>{dmg.name}</Pill>)}
                    </PillGroup>
                    <Text>Damage x0.5 from:</Text>
                    <PillGroup>
                        {damageRelations?.half_damage_from.map(dmg => <Pill c='orange' key={dmg.name}>{dmg.name}</Pill>)}
                    </PillGroup>
                    <Text>Damage x0.5 to:</Text>
                    <PillGroup>
                        {damageRelations?.half_damage_to.map(dmg => <Pill c='indigo' key={dmg.name}>{dmg.name}</Pill>)}
                    </PillGroup>
                </Stack>
            }
        </Popover.Dropdown>
    )
}