import { Card } from '@heroui/react';
import React, { useState } from 'react';
import CommentItem from './CommentItem';
import MoreComment from './MoreComment';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import type { CommentResponse } from '../../../store/interfaces/commentInterfaces';
import { ListComments } from '../../../services/CommentServices';
import { useParams } from 'react-router-dom';
import { EmptyState, ErrorState, LoadingState } from '../../Common';
interface CommentTypeProp {
  type: string
}
const CommentList: React.FC<CommentTypeProp> = ({ type }) => {
  const { id } = useParams()
  const [limit, setLimit] = useState<number>(10)
  const query = type == "answer" ? { "answer_id": id, 'limit': limit } : { "post_id": id, 'limit': limit }
  const { data, isLoading, isError, error } = useQuery<{
    comments: CommentResponse[],
    total: number,
  }>({
    queryKey: ["comments", limit],
    queryFn: () => ListComments(query)
  })

  const commentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <LoadingState message={'Loading comments...'} />
  }

  if (isError) {
    return <ErrorState message={error instanceof Error ? error.message : "Failed to load comments"} />;
  }
  console.log(data)
  return (
    <Card className='p-4' radius='sm'>
      <div className="flex justify-start items-center my-3">
        <div className="font-semibold">Comments ({data?.comments.length}/{data?.total})</div>
      </div>
      {data?.comments == null ? (<EmptyState title='No comment found' />) : (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence>
              {data?.comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  variants={commentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                  className='border-t border-content3 pb-4'
                >
                  <CommentItem comment={comment} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {data.comments.length < data.total && <MoreComment limit={limit} setLimit={setLimit} />}
        </>
      )}
    </Card>
  );
};

export default CommentList;