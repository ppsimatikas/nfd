const API_URL = 'https://verify-kz5nyuezpa-uc.a.run.app/'

// const API_URL = 'http://127.0.0.1:5001/demeter-a0451/us-central1/'

function getUrl(path: string, params: any = {}) {
    const url = new URL(`${API_URL}${path}`)
    url.search = new URLSearchParams(params).toString();
    return url
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