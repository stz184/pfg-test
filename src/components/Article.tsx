import NewsService, {Article, ArticleId} from "../services/NewsService";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import LoadingSpinner from "./LoadingSpinner";
import {useParams} from "react-router";
import {formatDate} from "../utils/DateHelper";

type ArticleParams = {
    articleId: ArticleId
}

const ArticleComponent = () => {
    const { articleId } = useParams() as ArticleParams;
    const [ article, setArticle ] = useState(undefined as Article|undefined);
    const [ isLoading, setIsLoading ] = useState(false);
    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        NewsService.getArticleById(articleId)
            .then((article) => setArticle(article))
            .finally(() => setIsLoading(false));
    }, []);

    if (!isLoggedIn) return <></>;
    if (!isLoading && !article) return <h1>404 Not Found</h1>;
    if (isLoading) return <LoadingSpinner />;

  return (
      <>
          {typeof article === "object" && (
              <>
                <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">{article.title}</h1>
                <h6 className="font-medium leading-tight text-base mb-2">{formatDate(article.published)}</h6>
                <p>{article.content}</p>
              </>
          )}
      </>
  )
}

export default ArticleComponent