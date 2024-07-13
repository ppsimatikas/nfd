import {Group, Loader, Select} from "@mantine/core";
import {useGetValues} from "../../data-access/filters";
import {useEffect, useState} from "react";

export function Filter({table, column, onChange}: {
    table: string
    column: string
    onChange: (item: string) => void
}) {
    const {data, error, isLoading} = useGetValues(table, column);
    const [value, setValue] = useState<string | null>(null)

    useEffect(() => {
        if (data) {
            setValue(data[0])
            onChange(data[0])
        }
    }, [data]);

    return (
        <Group>
            {!isLoading && data &&
                <Select
                    label="Item"
                    data={data}
                    value={value}
                    onChange={(o: any) => {
                        setValue(o)
                        console.log("onChange", o);
                        onChange(o)
                    }}
                    searchable
                />
            }
            {isLoading && <Loader size="sm"/>}
        </Group>
    );
}