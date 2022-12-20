import FetchHelper from "../utils/FetchHelper";

const endpoint: string = (process.env.REACT_APP_BACKEND_URL || 'https://localhost:9420').replace(/\/+$/, '');

export interface LoginData {
    [index: string]: string,
    username: string,
    password: string
}

export interface AuthenticationService {
    login: (credentials: LoginData) => Promise<any>
}

export default {
    login: (credentials: LoginData): Promise<any> => {
        return FetchHelper.post(endpoint + '/login', credentials);
    }
} as AuthenticationService;