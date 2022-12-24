import * as Yup from "yup";
import {Formik} from "formik";
import React, {useContext} from "react";
import ProfileHelper from "../utils/ProfileHelper";
import {UserContext} from "../App";

const ProfileForm = () => {
    const {isLoggedIn} = useContext(UserContext);

    if (!isLoggedIn) return <></>;

    const profile = ProfileHelper.getProfile();

    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required("Your first name is required"),
        lastName: Yup.string()
            .required("Your surname is required"),
        job: Yup.string()
            .required("Please, tell us your job occupation :)"),
        phone: Yup.string()
            .required("Please, enter your phone number (digits only)"),
        email: Yup.string()
            .required('Your email address is required')
            .email("Invalid email format")
    });

    const initialValues = {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        job: profile?.job,
        email: profile?.email,
        phone: profile?.phone
    }

    return (
        <div className="pb-6 lg:w-1/2">
            <h1 className="font-medium leading-tight text-5xl mt-0 mb-6 text-black-600">My Profile</h1>
            <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={() => {
                    return new Promise(res => setTimeout(res, 2500));
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      submitCount
                  }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {submitCount > 0 && !isSubmitting && (<p className="bg-green-50 border border-green-500 text-green-900 rounded-lg p-2 mb-2">Profile updated successfully</p>)}
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name"
                                       className="block mb-2 text-sm font-medium text-gray-900">First
                                    name</label>
                                <input type="text" id="first_name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="John"
                                       name="firstName"
                                       onChange={handleChange}
                                       value={values.firstName}
                                       required />
                                {touched.firstName && errors.firstName && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.firstName}</p>)}
                            </div>
                            <div>
                                <label htmlFor="last_name"
                                       className="block mb-2 text-sm font-medium text-gray-900">Last
                                    name</label>
                                <input type="text" id="last_name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="Doe"
                                       name="lastName"
                                       onChange={handleChange}
                                       value={values.lastName}
                                       required />
                                {touched.lastName && errors.lastName && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.lastName}</p>)}
                            </div>
                            <div>
                                <label htmlFor="job"
                                       className="block mb-2 text-sm font-medium text-gray-900">Job</label>
                                <input type="text" id="job"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="Developer"
                                       name="job"
                                       onChange={handleChange}
                                       value={values.job}
                                       required />
                                {touched.job && errors.job && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.job}</p>)}
                            </div>
                            <div>
                                <label htmlFor="phone"
                                       className="block mb-2 text-sm font-medium text-gray-900">Phone
                                    number</label>
                                <input type="tel" id="phone"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="088123456"
                                       name="phone"
                                       onChange={handleChange}
                                       value={values.phone}
                                       required />
                                {touched.phone && errors.phone && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone}</p>)}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">Email
                                address</label>
                            <input type="email" id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="john.doe@company.com"
                                   name="email"
                                   onChange={handleChange}
                                   value={values.email}
                                   required />
                            {touched.email && errors.email && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>)}
                        </div>
                        <button
                            type="submit"
                            className={`${isSubmitting ? 'bg-gray-300' : 'bg-blue-600 focus:bg-blue-700 active:bg-blue-800 hover:bg-blue-700'} px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin"
                                     viewBox="0 0 100 101"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"/>
                                </svg>
                            )}
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}


export default ProfileForm;