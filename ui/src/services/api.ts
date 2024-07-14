const API_URL = 'https://path-kz5nyuezpa-ew.a.run.app'

// const API_URL = 'http://127.0.0.1:5001/demeter-a0451/europe-west1/path'

function getUrl(path: string, params: any = {}) {
    const url = new URL(`${API_URL.replace("path", path)}`)
    url.search = new URLSearchParams(params).toString();
    return url
}

export function get(path: string, params: any = {}) {
    return fetch(getUrl(path, params))
}

export function post(path: string, params: any = {}, body: any = {}) {
    return fetch(getUrl(path, params), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

}