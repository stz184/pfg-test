import Cookies from 'js-cookie';

export interface SessionHelper {
    getToken: () => string|undefined,
    setToken: (value: string) => string|undefined,
    deleteToken: () => void
}

const tokenCookie: string = 'token';

export default {
    getToken(): string|undefined {
        return Cookies.get(tokenCookie);
    },
    setToken(value: string): string|undefined {
        return Cookies.set(tokenCookie, value, {
            sameSite: 'none',
            secure: true
        })
    },
    deleteToken(): void {
        Cookies.remove(tokenCookie);
    }

} as SessionHelper;