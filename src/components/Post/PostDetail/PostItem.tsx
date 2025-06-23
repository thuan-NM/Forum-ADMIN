import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { motion } from 'framer-motion';
import type { PostResponse } from "../../../store/interfaces/postInterfaces";
import { Card } from "@heroui/react";

interface PostItemProps {
  post: PostResponse;
  onDelete?: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 bg-content1 relative" radius="sm">
        <PostHeader post={post} onDelete={() => onDelete?.(post.id)} />
        <PostContent post={post} />
      </Card>
    </motion.div>
  );
};

export default PostItem;