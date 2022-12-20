import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, Router} from "react-router-dom";
import NewsGrid from "./components/NewsGrid";
import Article from "./components/Article";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <NewsGrid />,
    },
    {
        path: "news/:articleId",
        element: <Article />,
    },
]);

root.render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);