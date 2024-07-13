import {LineChart} from "@mantine/charts"
import {Stack, Title} from "@mantine/core";

function aggregateData(data: any[], dataKey: string, col: string): any[] {
    const result: { [key: number]: number } = {};

    data.forEach(item => {
        if (result[item[dataKey]]) {
            result[item[dataKey]] += parseInt(item[col]);
        } else {
            result[item[dataKey]] = parseInt(item[col]);
        }
    });

    return Object.keys(result).map((k: string) => ({
        [dataKey]: k,
        [col]: result[k as any]
    }));
}

export function UiLineChart({data, dataKey, col}: { data: any; dataKey: string; col: string }) {
    const chartData = aggregateData(data, dataKey, col)

    return (
        <Stack w="45%">
            <Title order={3}>{col} by {dataKey}</Title>
            <LineChart
                h={300}
                data={chartData}
                dataKey={dataKey}
                series={[
                    {name: col, color: 'indigo.6'},
                ]}
                curveType="linear"
            />
        </Stack>

    )
}