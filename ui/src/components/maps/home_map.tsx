import {Box} from "@mantine/core";
import {useGetAgricultureValue} from "../../data-access/agriculture_value";
import {useGetLanduse} from "../../data-access/land_use";
import {UiLoader} from "../loader";
import {UiGlobe} from "./globe";
import {getColor} from "../../utils/gradient";
import {useGetHungerLevels} from "../../data-access/hunger";

export function HomeMap({index}: { index: number }) {
    const {data: valueData, isLoading: valueIsLoading} = useGetAgricultureValue();
    const {data: landUseData, isLoading: ladUseIsLoading} = useGetLanduse();
    const {data: hungerData, isLoading: hungerIsLoading} = useGetHungerLevels();

    let datas: any[] = []
    let valCol = 'value'
    let cutExtremes = 0.04
    let startColor = '#deefff'
    let endColor = '#0c0d52'

    if (index === 0) {
        datas = valueData ?? []
    } else if (index === 1) {
        datas = landUseData ?? []
        cutExtremes = 0.01
        valCol = 'square_km'
        startColor = '#f6ffde'
        endColor = '#0c5217'
    } else if (index === 2) {
        datas = hungerData ?? []
        startColor = '#ffdede'
        endColor = '#520c0c'
    }

    const vals = datas.map((d: any) => d[valCol])

    const isLoading = valueIsLoading || ladUseIsLoading || hungerIsLoading

    return (
        <Box style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // Ensure it stays in the background
        }}>
            {isLoading && <UiLoader/>}
            <UiGlobe
                animate
                polygonCapColor={(a: any) => {
                    const record = datas.find((d: any) => d.code === a.properties.ADM0_A3)
                    if (record) {
                        return getColor(record[valCol], vals, startColor, endColor, cutExtremes) + "AF"
                    }
                    return 'rgba(0, 0, 0, 0)'
                }}
            />
        </Box>
    )
}