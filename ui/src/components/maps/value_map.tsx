import {UiGlobe} from "./globe";
import {getColor} from "../../utils/gradient";
import {UiLoader} from "../loader";
import {useGetAgricultureValue} from "../../data-access/agriculture_value";

export function ValueMap() {
    const {data, isLoading} = useGetAgricultureValue();
    let valueData = data ?? []

    valueData = valueData.filter((d: any) => d.code)
    const vals = valueData.map((d: any) => d.value)

    return (
        <>
            {isLoading && <UiLoader/>}
            <UiGlobe
                animate
                polygonCapColor={(a: any) => {
                    const record = valueData.find((d: any) => d.code === a.properties.ADM0_A3)
                    if (record) {
                        return getColor(record.value, vals, "#f6ffde", "#0c5217", 0.04) + "AF"
                    }
                    return 'rgba(0, 0, 0, 0)'
                }}
            />
        </>
    )
}