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
                isSubmitting
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
                        className={`${isSubmitting ? 'bg-gray-300' : 'bg-blue-600'} w-full px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"/>
                            </svg>
                        )}
                        Login
                    </button>
                </form>
            )}
        </Formik>
    );
}

export default LoginForm;