import { Avatar } from '@heroui/react';
import { GoDotFill } from 'react-icons/go';
import { format } from 'timeago.js';

interface Comment {
    id: number;
    author: string;
    date: number;
    content: string;
    replies: Comment[];
}

interface CommentItemProps {
    comment: Comment;
    level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, level = 0 }) => {
    return (
        <div
            className="flex mt-4 "
            style={{ marginLeft: `${level * 5}px` }} // Thụt lề cho các comment con
        >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                <Avatar
                    size="sm"
                    radius="full"
                    className="w-full h-full object-cover"
                    src={`https://i.pravatar.cc/150?img=${comment.author}`}
                />
            </div>
            <div className="flex flex-col gap-y-1 pl-2 !text-xs md:text-sm w-full">
                <div className="flex gap-x-1">
                    <div className="font-bold flex flex-wrap items-center gap-x-1">
                        <div>{comment.author}</div>
                        <GoDotFill className="w-2 h-2 hidden sm:block" />
                    </div>
                    <div className="opacity-90 text-xs flex flex-wrap !items-center">
                        <div>{format(comment.date)}</div>
                    </div>
                </div>
                <div>
                    <div className="text-sm">{comment.content}</div>
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="reply-comment mt-4">
                            {comment.replies.map((reply) => (
                                <CommentItem key={reply.id} comment={reply} level={level + 1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;