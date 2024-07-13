import {useGetLanduse} from "../../data-access/land_use";
import {UiGlobe} from "./globe";
import {getColor} from "../../utils/gradient";
import {UiLoader} from "../loader";

export function LanduseMap() {
    const {data, isLoading} = useGetLanduse();
    let landUse = data ?? []

    landUse = landUse.filter((d: any) => d.code)
    const sqkms = landUse.map((d: any) => d.square_km)

    return (
        <>
            {isLoading && <UiLoader/>}
            <UiGlobe
                animate
                polygonCapColor={(a: any) => {
                    const record = landUse.find((d: any) => d.code === a.properties.ADM0_A3)
                    if (record) {
                        return getColor(record.square_km, sqkms, "#f6ffde", "#0c5217", 0.01) + "AF"
                    }
                    return 'rgba(0, 0, 0, 0)'
                }}
            />
        </>
    )
}