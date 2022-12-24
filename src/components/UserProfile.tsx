import ProfileHelper from "../utils/ProfileHelper";
import {useContext} from "react";
import {UserContext} from "../App";
import SessionHelper from "../utils/SessionHelper";

const UserProfile = () => {
    const profile = ProfileHelper.getProfile();

    const {setIsLoggedIn} = useContext(UserContext);

    const logout = () => {
        SessionHelper.deleteToken();
        ProfileHelper.clearProfile();
        setIsLoggedIn(false);
    }

    if (!profile) return <></>;

    return (
        <>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={profile.photo} alt="Bonnie image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900">{profile.firstName} {profile.lastName}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{profile.job}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href="#" onClick={logout} className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Logout</a>
                </div>
            </div>
        </>
    );
}

export default UserProfile;