import React, {useContext} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import AuthenticationService, {LoginData} from "../services/AuthenticationService";
import UserProfile from "../user/UserProfile";
import ProfileHelper from "../utils/ProfileHelper";
import SessionHelper from "../utils/SessionHelper";
import {UserContext} from "../App";

const LoginForm = () => {
    const schema = Yup.object().shape({
        username: Yup.string()
            .required("Username is a required field")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is a required field")
    });

    const { setIsLoggedIn } = useContext(UserContext);

    return (
        <Formik
            validationSchema={schema}
            initialValues={{username: "", password: ""}}
            onSubmit={(values) => {
                const credentials: LoginData = values;
                AuthenticationService.login(credentials).then((data) => {
                    const profile: UserProfile = (({ username, firstName, lastName, job, phone, photo, email }) => ({ username, firstName, lastName, job, phone, photo, email }))(data);
                    const token: string = data.token;

                    ProfileHelper.persistProfile(profile);
                    SessionHelper.setToken(token);

                    setIsLoggedIn(true);
                })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <input
                            type="email"
                            className={`${touched.username ? (errors.username ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500') : ''}form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                            id="username"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder="Username"
                        />
                        {touched.username && errors.username && (<p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username}</p>)}
                    </div>
                    <div className="form-group mb-6">
                        <input
                            type="password"
                            className={`${touched.password ? (errors.password ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500') : ''} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                        />
                        {touched.password && errors.password && (<p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>)}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Login
                    </button>
                </form>
            )}
        </Formik>
    );
}

export default LoginForm;