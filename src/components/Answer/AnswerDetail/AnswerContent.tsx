import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingState } from '../../Common';
import type { AnswerResponse } from '../../../store/interfaces/answerInterfaces';

const MAX_LINES = 6; // Giới hạn số dòng hiển thị ban đầu

const AnswerContent: React.FC<{ answer: AnswerResponse }> = ({ answer }) => {

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
              __html: answer.content,
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnswerContent;