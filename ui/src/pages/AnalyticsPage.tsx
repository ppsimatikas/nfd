import {Center, Group, Select, Stack, Text, Title} from "@mantine/core";
import {useRef, useState} from "react";
import {Filter} from "../components/filters/filters";
import {LayeredMap} from "../components/maps/layered_map";
import {UiLineChart} from "../components/charts/line_chart";
import {useGetFilteredData} from "../data-access/filters";
import {UiBarChart} from "../components/charts/bar_chart";
import {UiLoader} from "../components/loader";

const catalog: any = {
    'agriculture': [
        'crops_and_livestock',
        // 'land_use',
        // "hunger_levels"
    ],
    'weather': ['weather']
}

export function AnalyticsPage() {
    const ref = useRef(null)
    const domains = Object.keys(catalog)
    const [domain, setDomain] = useState(domains[0])
    const [tables, setTables] = useState(catalog[domain])
    const [table, setTable] = useState(tables[0])
    const [filterColumn, setFilterColumn] = useState('Item')
    const [valueColumn, setValueColumn] = useState('Value')

    const [filters, setFilters] = useState({})
    const {data, isLoading} = useGetFilteredData(table, filters);

    return (
        <Stack ref={ref} gap="xl" mih={600}>
            <Stack gap="xs">
                <Title order={2}>Visualize Demeter's Datasets</Title>
                <Text c="dimmed">Limited access for demo...</Text>
            </Stack>
            {isLoading && <UiLoader/>}
            <Center>
                <Stack>
                    <Group>
                        <Select
                            label="Domain"
                            value={domain}
                            data={domains}
                            onChange={(o) => {
                                const dom = o ?? domains[0];
                                setDomain(dom)
                                setTables(catalog[dom])
                                setTable(catalog[dom][0])
                            }}
                            disabled
                        />
                        <Select
                            label="Table"
                            value={table}
                            data={tables}
                            onChange={(o) => setTable(o ?? tables[0])}
                            disabled
                        />
                        <Filter table={table} column={filterColumn}
                                onChange={(v) => setFilters({...filters, [filterColumn]: v})}/>
                    </Group>
                    {/*<Group>*/}
                    {/*    <Select*/}
                    {/*        label="Select Filter"*/}
                    {/*        value={filterColumn}*/}
                    {/*        data={tables}*/}
                    {/*        onChange={(o) => setFilterColumn(o ?? '')}*/}
                    {/*    />*/}
                    {/*    <Select*/}
                    {/*        label="Select Value"*/}
                    {/*        value={valueColumn}*/}
                    {/*        data={tables}*/}
                    {/*        onChange={(o) => setValueColumn(o ?? '')}*/}
                    {/*    />*/}
                    {/*</Group>*/}
                </Stack>
            </Center>
            {data &&
                <LayeredMap data={data} valCol={valueColumn} areaCol='Area' adminCol='ADMIN'
                            w={(ref.current as any).offsetWidth ?? 100}/>}
            <Group justify="space-between">
                {data && <UiLineChart data={data} dataKey={'Year'} col={valueColumn}/>}
                {data && <UiBarChart data={data} dataKey={'Area'} col={valueColumn}/>}
            </Group>
        </Stack>
    );
}
