import NewsService, {Article, ArticleId, Comment} from "../services/NewsService";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import LoadingSpinner from "./LoadingSpinner";
import {useParams} from "react-router";
import {formatDate} from "../utils/DateHelper";
import CommentComponent from "./Comment";
import Pager from "./Pager";

type ArticleParams = {
    articleId: ArticleId
}

const ArticleComponent = () => {
    const {articleId} = useParams() as ArticleParams;
    const [article, setArticle] = useState(undefined as Article | undefined);
    const [comments, setComments] = useState([] as Comment[]);
    const [page, setPage] = useState(1);
    const [isArticleLoading, setIsArticleLoading] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const {isLoggedIn} = useContext(UserContext);

    useEffect(() => {
        setIsArticleLoading(true);
        NewsService.getArticleById(articleId)
            .then((article) => setArticle(article))
            .finally(() => setIsArticleLoading(false));
    }, []);

    useEffect(() => {
        setIsCommentsLoading(true);
        NewsService.getComments(articleId, page)
            .then(
                (comments) => setComments(comments)
            )
            .catch(() => {})
            .finally(() => setIsCommentsLoading(false));
    }, [page]);

    if (!isLoggedIn) return <></>;
    if (!isArticleLoading && !article) return <h1>404 Not Found</h1>;
    if (isArticleLoading) return <LoadingSpinner/>;

    return (
        <>
            {typeof article === "object" && (
                <>
                    <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">{article.title}</h1>
                    <h6 className="font-medium leading-tight text-base mb-2">{formatDate(article.published)}</h6>
                    <h6 className="font-medium leading-tight text-base mb-2">{article.content}</h6>

                    <div className="">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
                        {isCommentsLoading && <LoadingSpinner />}
                        {!isCommentsLoading && comments.map((comment) => <CommentComponent key={comment.id} comment={comment} />)}
                        {!isCommentsLoading && comments.length > 0 && <Pager itemsNumber={60} itemsOnPage={20} onPageCallback={setPage} currentPage={page} />}
                    </div>
                </>
            )}
        </>
    )
}

export default ArticleComponent