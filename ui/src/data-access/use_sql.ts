import {sql} from '../services/sql'
import {useQuery} from '@tanstack/react-query';

export function useSql(table: string, query: string) {
    return useQuery({
        queryKey: [table, query],
        queryFn: async () => {
            const res = await sql(table, query)
            return await res.json()
        },
        staleTime: 3600000 * 3, // 3 hours
        enabled: query.length > 0 && table.length > 0
    })
}