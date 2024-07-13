import {sql} from '../services/sql'
import {useQuery} from '@tanstack/react-query';

export function useGetHungerLevels() {
    const table = "hunger_levels"
    return useQuery({
        queryKey: [table],
        queryFn: async () => {
            const query = `select code, sum(value) as value
                           from ${table}
                           where code is not null
                           group by code`

            const res = await sql(table, query)
            return await res.json()
        },
        staleTime: 3600000 * 3, // 3 hours
    })
}