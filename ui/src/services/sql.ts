import {post} from "./api"

export function sql(table: string, query: string) {
    return post('sql', {table}, {query})
}