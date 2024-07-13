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
        },
        staleTime: 3600000 * 1,
    })
}

export function useGetFilteredData(table: string, filters: any) {
    const where = Object.entries(filters).reduce((acc, [key, value]) => {
        acc.push(`"${key}" = "${value}"`)
        return acc
    }, [] as string[]).join('AND')
    return useQuery({
        queryKey: ['filtered-data', table, where],
        queryFn: async () => {
            const query = `select *
                           from ${table}
                           where ${where}`

            const res = await sql(table, query)
            return await res.json()
        },
        staleTime: 3600000 * 1,
    })
}