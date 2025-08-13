import { Avatar, CardHeader } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../store/interfaces/userInterfaces";
import { GetUserById } from "../../../services/UserServices";
import { GoDotFill } from "react-icons/go";
import { format } from "timeago.js";
import { ErrorState, LoadingState, StatusChip } from "../../Common";
import type { PostResponse } from "../../../store/interfaces/postInterfaces";
import PostActions from "../PostActions";
import { useDeletePost } from "../../../hooks/posts/useDeletePost";
import { useUpdatePostStatus } from "../../../hooks/posts/useUpdateAnswerStatus";
// import { useDeletePost } from "../../../hooks/useDeletePost";
// import { useUpdatePostStatus } from "../../../hooks/useUpdatePostStatus";

interface PostHeaderProps {
  post: PostResponse;
  onDelete?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User>({
    queryKey: ["users", post.author.id],
    queryFn: () => GetUserById(post.author.id),
  });
  const date = new Date(post?.createdAt).getTime();
  const { deleteError } = useDeletePost();

  const { updateError } = useUpdatePostStatus();
  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState message={error.message} />;
  }

  if (deleteError || updateError) {
    return (
      <ErrorState
        message={
          deleteError
            ? deleteError instanceof Error
              ? deleteError.message
              : "Xoá bài đăng thất bại"
            : updateError instanceof Error
            ? updateError.message
            : "Cập nhật bài đăng thất bại"
        }
      />
    );
  }

  return (
    <CardHeader className="flex w-full justify-between">
      <div className="flex items-center gap-x-2">
        <Avatar
          size="sm"
          radius="full"
          className="w-6 h-6 sm:w-8 sm:h-8"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        <div className="flex flex-col !text-xs md:text-sm gap-y-1">
          <div className="font-bold flex flex-wrap items-center gap-x-1">
            <div>{user?.fullName}</div>
            <StatusChip type="post" status={post.status} />
          </div>
          <div className="opacity-90 text-xs flex flex-wrap !items-center gap-x-1">
            <div className="hidden sm:block">{user?.email}</div>
            <GoDotFill className="w-2 h-2" />
            <div>{format(date)}</div>
          </div>
        </div>
      </div>
      <PostActions post={post} />
    </CardHeader>
  );
};

export default PostHeader;
