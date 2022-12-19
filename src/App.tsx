import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import 'tw-elements';
import "./App.css";
import LoginForm from "./components/LoginForm";
import SessionHelper from "./utils/SessionHelper";
import UserProfile from "./components/UserProfile";
import ProfileHelper from "./utils/ProfileHelper";

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
          {/* search bar begin */}
          <div className="flex justify-center float-left">
            <div className="mb-3 xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
                <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <br className="clear-left" />
          {/* search bar end */}
          <section className="mb-32 text-gray-800 background-radial-gradient">
            <div className="px-6 py-12 md:px-12 text-center lg:text-left">
              <div className="container mx-auto xl:px-32">
                <div className="grid lg:grid-cols-2 gap-12 flex items-center">
                  <div className="mt-12 lg:mt-0">
                    <h1
                        className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
                        style={{color: "hsl(218, 81%, 95%)"}}
                    >
                      Do not miss <br /><span style={{color: "hsl(218, 81%, 75%)"}}>any updates</span>
                    </h1>
                    <p className="mb-4 opacity-70 lead" style={{color: "hsl(218, 81%, 85%)"}}>
                      We will write rarely and only high-quality content.
                    </p>
                  </div>
                  <div className="mb-12 lg:mb-0">
                    <div className="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
                      {!isLoggedIn && (<>
                          <h2 className="text-3xl font-bold mb-12">Login to read the news</h2>
                          <LoginForm />
                         </>
                      )}
                      {isLoggedIn && <UserProfile />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </UserContext.Provider>
  );
}

export default App;
