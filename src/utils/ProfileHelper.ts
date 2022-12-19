import UserProfile from "../user/UserProfile";

const sessionStorageKey: string = 'userProfile';

export interface ProfileHelper {
    persistProfile: (profile: UserProfile) => void,
    getProfile: () => UserProfile|null,
    clearProfile: () => void
}

export default {
    persistProfile(profile: UserProfile): void {
        return sessionStorage.setItem(sessionStorageKey, JSON.stringify(profile));
    },
    getProfile(): UserProfile|null {
        const profile = sessionStorage.getItem(sessionStorageKey);

        if (profile === null) {
            return null;
        }

        return JSON.parse(profile) as UserProfile;
    },
    clearProfile(): void {
        return sessionStorage.removeItem(sessionStorageKey);
    },
} as ProfileHelper;