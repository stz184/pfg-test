export interface FetchHelper {
    get: (url: string, params: {[index: string]: any}) => Promise<any>,
    post: (url: string, data: {[index: string]: any}) => Promise<any>
}

export default {
    get(baseUrl: string, params: {[index: string]: any} = {}): Promise<any> {
        let url = new URL(baseUrl);
        Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));

        return fetch(url).then(res => res.json());
    }, post(url: string, data: {[index: string]: any} = {}): Promise<any> {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        }).then(res => res.json());
    }

} as FetchHelper;