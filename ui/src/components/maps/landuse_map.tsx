import {useGetLanduse} from "../../data-access/land_use";
import {UiGlobe} from "./globe";
import {getColor} from "../../utils/gradient";

export function LanduseMap() {
    const {data, error, isLoading} = useGetLanduse();

    if (!data) {
        return <></>
    }

    const sqkms = data.map((d: any) => d.square_km)

    return (
        <UiGlobe
            animate
            polygonCapColor={(a: any) => {
                const record = data.find((d: any) => d.code === a.properties.ADM0_A3)
                if (record) {
                    return getColor(record.square_km, sqkms, "#f6ffde", "#0c5217", 0.01) + "AF"
                }
                return 'rgba(0, 0, 0, 0)'
            }}
        />
    )
}