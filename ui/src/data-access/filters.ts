import {sql} from '../services/sql'
import {useQuery} from '@tanstack/react-query';

export function useGetValues(table: string, column: string) {
    return useQuery({
        queryKey: ['filters', table, column],
        queryFn: async () => {
            const query = `select distinct ${column}
                           from ${table}
                           order by ${column}`

            const res = await sql(table, query)
            const data = await res.json()

            return data.map((d: any) => d[column])
        }
    })
}