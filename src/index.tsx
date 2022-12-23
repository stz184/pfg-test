import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NewsGrid from "./components/NewsGrid";
import Article from "./components/Article";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([{
    element: <App/>,
    children: [
        {
            path: "/",
            element: <NewsGrid/>,
        },
        {
            path: "news/:articleId",
            element: <Article/>,
        }
    ]
}]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);