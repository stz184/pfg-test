import {Comment} from "../services/NewsService";

type CommentComponentProps = {
    comment: Comment
};

const CommentComponent = ({comment}: CommentComponentProps) => {
    return (
        <div className="flex mb-2">
            <div className="flex-shrink-0 mr-3">
                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                     src="/avatar.png"
                     alt=""/>
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{comment.author}</strong>
                <p className="text-sm">
                    {comment.content}
                </p>
            </div>
        </div>
    );
};


export default CommentComponent;