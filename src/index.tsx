import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NewsGrid from "./components/NewsGrid";
import Article from "./components/Article";
import ProfileForm from "./components/ProfileForm";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([{
    element: <App/>,
    children: [
        {
            path: '/',
            element: <NewsGrid/>,
        },
        {
            path: 'news/:articleId',
            element: <Article/>,
        },
        {
            path: 'profile',
            element: <ProfileForm />
        }
    ]
}]);

root.render(
    <>
        <RouterProvider router={router}/>
    </>
);