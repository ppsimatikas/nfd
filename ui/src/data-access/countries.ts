import {useQuery} from '@tanstack/react-query';

export function useCountries() {
    return useQuery({
        queryKey: ['countries'],
        queryFn: () => fetch('/datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
    })
}