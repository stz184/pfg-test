import {Article} from "../services/NewsService";
import {Link} from "react-router-dom";
import {formatDate} from "../utils/DateHelper";

type ArticleCardProps = {
    article: Article
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
      <div className="flex justify-center">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-3">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{article.title}</h5>
              <p className="text-gray-700 text-base mb-4">
                  {article.content.length > 400 ? `${article.content.substring(0, 400)}...` : article.content}
              </p>

              <Link
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  to={`news/${article.id}`}>View more</Link>
              <div className="py-3 px-6 mt-3 border-t border-gray-300 text-gray-600 text-center">
                  {formatDate(article.published)}
              </div>
          </div>
      </div>
  );
}

export default ArticleCard;