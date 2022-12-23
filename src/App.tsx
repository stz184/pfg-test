import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import 'tw-elements';
import "./App.css";
import LoginForm from "./components/LoginForm";
import SessionHelper from "./utils/SessionHelper";
import UserProfile from "./components/UserProfile";
import ProfileHelper from "./utils/ProfileHelper";
import {Outlet} from "react-router-dom";
import SearchBar from "./components/SearchBar";

interface UserContext {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext<UserContext>({} as UserContext);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        setIsLoggedIn(SessionHelper.getToken() !== 'undefined' && ProfileHelper.getProfile() !== null);
    }, []);

    const contextValue = {isLoggedIn, setIsLoggedIn} as UserContext;

    return (
        <UserContext.Provider value={contextValue}>
            <div className="container my-24 mt-7 px-6 mx-auto">
                <SearchBar/>
                <br className="clear-left"/>
                <section className="mb-12 text-gray-800 background-radial-gradient">
                    <div className="px-6 py-12 md:px-12 text-center lg:text-left">
                        <div className="container mx-auto xl:px-32">
                            <div className="grid lg:grid-cols-2 gap-12 flex items-center">
                                <div className="mt-12 lg:mt-0">
                                    <h1
                                        className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
                                        style={{color: "hsl(218, 81%, 95%)"}}
                                    >
                                        Do not miss <br/><span style={{color: "hsl(218, 81%, 75%)"}}>any updates</span>
                                    </h1>
                                    <p className="mb-4 opacity-70 lead" style={{color: "hsl(218, 81%, 85%)"}}>
                                        We will write rarely and only high-quality content.
                                    </p>
                                </div>
                                <div className="mb-12 lg:mb-0">
                                    <div className="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
                                        {!isLoggedIn && (<>
                                                <h2 className="text-3xl font-bold mb-12">Login to read the news</h2>
                                                <LoginForm/>
                                            </>
                                        )}
                                        {isLoggedIn && <UserProfile/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Outlet/>
            </div>
        </UserContext.Provider>
    );
}

export default App;
