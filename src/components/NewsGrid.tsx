import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import NewsService, {Article} from "../services/NewsService";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";

const NewsGrid = () => {
    const { isLoggedIn } = useContext(UserContext);
    const [ articles, setArticles ] = useState([] as Article[]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        NewsService.getNews()
            .then((articles) => setArticles(articles))
            .finally(() => setIsLoading(false));
    }, []);

    if (!isLoggedIn || (articles.length === 0 && !isLoading)) return <></>;

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="flex flex-wrap justify-around float-left">
            {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
    )
}

export default NewsGrid;