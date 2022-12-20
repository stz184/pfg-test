import {type} from "os";

type ParametersMap = {[index: string]: string};

export interface FetchHelper {
    get: (url: string, params?: ParametersMap|undefined, headers?: ParametersMap|undefined) => Promise<any>,
    post: (url: string, data: ParametersMap|undefined, headers?: ParametersMap|undefined) => Promise<any>
}

export default {
    get(baseUrl: string, params?: ParametersMap|undefined, headers?: ParametersMap|undefined): Promise<any> {
        let url = new URL(baseUrl);

        typeof params === "object" && Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));

        return fetch(url, {headers}).then(res => res.json());
    },
    post(url: string, data: ParametersMap|undefined = {}, headers?: ParametersMap|undefined): Promise<any> {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        }).then(res => res.json());
    }

} as FetchHelper;