import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingState } from '../../Common';
import type { PostResponse } from '../../../store/interfaces/postInterfaces';

const MAX_LINES = 6; // Giới hạn số dòng hiển thị ban đầu

const PostContent: React.FC<{ post: PostResponse }> = ({ post }) => {

  const contentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);




  return (
    <div>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <motion.div
            ref={contentRef}
            initial={{ height: `${MAX_LINES * 2}rem`, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="leading-loose overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </>
      )}
    </div>
  );
};

export default PostContent;