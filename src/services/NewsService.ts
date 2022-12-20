import fetchHelper from "../utils/FetchHelper";
import SessionHelper from "../utils/SessionHelper";

const endpoint: string = (process.env.REACT_APP_BACKEND_URL || 'https://localhost:9420').replace(/\/+$/, '');

export type ArticleId = `${number}` | number

export interface Article {
    id: ArticleId,
    title: string,
    published: string,
    content: string
}

interface NewsService {
    getNews: () => Promise<Article[]>,
    getArticleById: (id: ArticleId) => Promise<Article>
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
    }

} as NewsService;