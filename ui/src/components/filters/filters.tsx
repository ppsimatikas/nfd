import {Group, Select} from "@mantine/core";
import {useGetValues} from "../../data-access/filters";
import {useState} from "react";

export function Filters() {
    const {data, error, isLoading} = useGetValues("crops_and_livestock", "Item");
    const [value, setValue] = useState<string | null>(null)

    return (
        <Group>
            {!isLoading && data &&
                <Select
                    label="Item"
                    data={data}
                    value={value}
                    onChange={(o: any) => setValue(o.value)}
                    searchable
                />
            }
        </Group>
    );
}