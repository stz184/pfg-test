import {useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import NewsService, {Article} from "../services/NewsService";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";
import {useSearchParams, Link} from "react-router-dom";
// @ts-ignore
import escape from "regexp.escape";


const NewsGrid = () => {
    const {isLoggedIn} = useContext(UserContext);
    const [articles, setArticles] = useState([] as Article[]);
    const [isLoading, setIsLoading] = useState(true);
    const [search] = useSearchParams();

    const searchNews = useCallback((article: Article) => {
        const query = search.get('q');
        if (!query) return true;

        const rx = new RegExp(escape(query), 'ig');
        return article.title.search(rx) > -1;
    }, [search]);

    useEffect(() => {
        setIsLoading(true);
        NewsService.getNews()
            .then((articles) => setArticles(articles))
            .finally(() => setIsLoading(false));
    }, []);

    if (!isLoggedIn || (articles.length === 0 && !isLoading)) return <></>;

    if (isLoading) return <LoadingSpinner/>;

    const articlesFiltered = articles.filter((article: Article) => searchNews(article));

    return (
        <div className="flex flex-wrap justify-around">
            {articlesFiltered
                .filter((article: Article) => searchNews(article))
                .map((article) => <ArticleCard key={article.id} article={article}/>)
            }
            {articles.length > 0 && articlesFiltered.length == 0 && (
                <div className="text-center text-gray-800 pb-6 ml-auto mr-auto">
                    <h1 className="text-5xl font-bold mt-0 mb-6">No results found</h1>
                    <h3 className="text-3xl font-bold mb-8">Try searching with different words</h3>
                    <Link
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        data-mdb-ripple="true" data-mdb-ripple-color="light" to='/' role="button">Go back</Link>
                </div>)}
        </div>
    )
}

export default NewsGrid;