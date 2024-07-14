import Globe, {GlobeProps} from "react-globe.gl";
import {useEffect, useRef} from "react";
import {useCountries} from "../../data-access/countries";

export interface UiGlobeProps extends GlobeProps {
    showCountries?: boolean
    animate?: boolean
}

export function UiGlobe({animate, showCountries, ...props}: UiGlobeProps) {
    const globeEl: any = useRef()
    const {data: countries} = useCountries();

    useEffect(() => {
        // Auto-rotate
        if (globeEl && globeEl.current && animate) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.3;

            // globeEl.current.pointOfView({altitude: 4}, 5000);
        }
    }, [globeEl, animate]);

    return (
        <Globe
            ref={globeEl}
            showAtmosphere
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            polygonsData={countries && countries.features}
            polygonSideColor={() => 'rgba(100, 100, 100, 1)'}
            {...props}
        />
    )
}