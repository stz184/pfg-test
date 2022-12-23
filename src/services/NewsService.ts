import fetchHelper from "../utils/FetchHelper";
import SessionHelper from "../utils/SessionHelper";

const endpoint: string = (process.env.REACT_APP_BACKEND_URL || 'https://localhost:9420').replace(/\/+$/, '');

export type ArticleId = `${number}` | number
export type CommentId = ArticleId;

export interface Article {
    id: ArticleId,
    title: string,
    published: string,
    content: string
};

export interface Comment {
    id: CommentId,
    articleId: ArticleId,
    author: string,
    content: string
}

interface NewsService {
    getNews: () => Promise<Article[]>,
    getArticleById: (id: ArticleId) => Promise<Article>,
    getComments: (id: ArticleId, page: number) => Promise<Comment[]>
}

export default {
    getArticleById(id: ArticleId): Promise<Article> {
        const token = SessionHelper.getToken()
        return fetchHelper.get(`${endpoint}/news/${id}`, undefined, {
            'Authorization': `Bearer ${token}`
        });
    },
    getNews(): Promise<Article[]> {
        const token = SessionHelper.getToken()
        return fetchHelper.get(endpoint + '/news', undefined, {
            'Authorization': `Bearer ${token}`
        })
    },
    getComments(id: ArticleId, page: number): Promise<Comment[]> {
        const token = SessionHelper.getToken();
        return fetchHelper.get( `${endpoint}/news/${id}/comments/${page}`, undefined, {
            'Authorization': `Bearer ${token}`
        });
    }
} as NewsService;