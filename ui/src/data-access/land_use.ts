import {sql} from '../services/sql'
import {useQuery} from '@tanstack/react-query';

export function useGetLanduse() {
    const table = "land_use"
    return useQuery({
        queryKey: [table],
        queryFn: async () => {
            const query = `select *
                           from ${table}
                           WHERE year = (SELECT MAX (year) FROM ${table})`

            const res = await sql(table, query)
            return await res.json()
        }
    })
}