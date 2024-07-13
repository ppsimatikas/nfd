import {BarChart} from "@mantine/charts"
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

export function UiBarChart({data, dataKey, col}: { data: any; dataKey: string; col: string }) {
    const chartData = aggregateData(data, dataKey, col).sort((a, b) => b[col] - a[col]);

    return (
        <Stack w="45%">
            <Title order={3}>{col} by Country</Title>
            <BarChart
                h={300}
                data={chartData}
                dataKey={dataKey}
                series={[
                    {name: col, color: '#7928D2'},
                ]}
            />
        </Stack>
    )
}