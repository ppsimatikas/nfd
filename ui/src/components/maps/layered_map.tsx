import {UiGlobe} from "./globe";
import {getColor} from "../../utils/gradient";

export function LayeredMap({w, data, valCol, areaCol, adminCol = 'ADM0_A3'}: {
    w: number
    data: []
    valCol: string
    areaCol: string
    adminCol: string
}) {
    const vals = data.map((d: any) => d[valCol])

    return (
        <UiGlobe
            width={w}
            height={300}
            animate
            polygonCapColor={(a: any) => {
                const record = data.find((d: any) => d[areaCol] === a.properties[adminCol])
                if (record) {
                    return getColor(record[valCol], vals, "#C766EF", "#2B0C52", 0.01) + "AF"
                }
                return 'rgba(0, 0, 0, 0)'
            }}
        />
    )
}