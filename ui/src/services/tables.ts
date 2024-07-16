import {post} from "./api";

export function uploadData(body: {
    domain: string,
    table: string,
    description: string,
    data: string,
}) {
    return post('tables', {}, body).then((res) => {
        console.log(res)
        return res.json()
    })
}