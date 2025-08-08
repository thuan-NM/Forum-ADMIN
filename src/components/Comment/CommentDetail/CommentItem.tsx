import { Avatar, Button } from "@heroui/react";
import { GoDotFill } from "react-icons/go";
import { format } from "timeago.js";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CommentResponse } from "../../../store/interfaces/commentInterfaces";
import { ListReplies } from "../../../services/CommentServices"; // New service function
import { ErrorState, LoadingState } from "../../Common";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

interface CommentItemProps {
  comment: CommentResponse;
  level?: number;
}

const MAX_LINES = 5;
const LINE_HEIGHT_PX = 20;

const CommentItem: React.FC<CommentItemProps> = ({ comment, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [textContent, setTextContent] = useState("");

  const { data, isLoading, isError } = useQuery<{
    replies: CommentResponse[];
    total: number;
  }>({
    queryKey: ["replies", comment.id],
    queryFn: () => ListReplies({ comment_id: comment.id, limit: 5 }),
    enabled: showReplies, // Only fetch when showReplies is true
  });
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(comment.content, "text/html");

    const cleanText = DOMPurify.sanitize(doc.body.innerHTML, {
      ADD_TAGS: ["ol", "ul", "li"],
    });
    setTextContent(cleanText);
  }, [comment.content]);

  useEffect(() => {
    if (contentRef.current) {
      const maxHeight = MAX_LINES * LINE_HEIGHT_PX;
      // Chờ DOM render để đo chính xác
      requestAnimationFrame(() => {
        const scrollHeight = contentRef.current?.scrollHeight || 0;
        setIsOverflowing(scrollHeight > maxHeight);
      });
    }
  }, [textContent]);

  const cleanContent = DOMPurify.sanitize(comment.content, {
    ADD_TAGS: ["ol", "ul", "li"],
  });
  return (
    <div className={`flex mt-4`}>
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
        <Avatar
          size="sm"
          radius="full"
          className="w-full h-full object-cover"
          src={`https://i.pravatar.cc/150?img=${comment.author}`}
        />
      </div>
      <div className="flex flex-col gap-y-1 pl-2 !text-xs md:text-sm w-11/12">
        <div className="flex gap-x-1">
          <div className="font-bold flex flex-wrap items-center gap-x-1">
            <div>{comment.author.fullName}</div>
            <GoDotFill className="w-2 h-2 hidden sm:block" />
          </div>
          <div className="opacity-90 text-xs flex flex-wrap !items-center">
            <div>{format(comment.createdAt)}</div>
          </div>
        </div>
        <div>
          {/* <div className="text-sm">{comment.content}</div> */}
          <>
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`relative bg-content1 py-1 text-sm prose dark:prose-invert ${expanded ? "" : "line-clamp-5"} !w-full max-w-full px-0 ${!expanded && isOverflowing ? "overflow-hidden" : ""}`}
              dangerouslySetInnerHTML={{
                __html: expanded ? cleanContent : textContent,
              }}
            />

            {isOverflowing && (
              <div className="flex justify-end">
                <motion.button
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-500 font-semibold hover:underline mt-2 mr-3 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {expanded ? "Thu gọn" : "Tải thêm"}
                </motion.button>
              </div>
            )}
          </>
          {comment.has_replies && (
            <div className="mt-2">
              {showReplies && (
                <div>
                  {isLoading && <LoadingState message="Loading replies..." />}
                  {isError && <ErrorState message="Failed to load replies" />}
                  <div className="reply-comment my-2">
                    {data?.replies.map((reply) => (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        level={level + 1}
                      />
                    ))}
                  </div>
                </div>
              )}
              <Button
                size="sm"
                variant={!showReplies ? "bordered" : "flat"}
                className="mt-1 mx-auto"
                onClick={() => setShowReplies(!showReplies)}
                radius="full"
              >
                {!showReplies ? (
                  <>
                    <Icon
                      icon={"lucide:message-circle-reply"}
                      className="text-base"
                    />
                    <p>Show replies</p>
                  </>
                ) : (
                  <>
                    <Icon icon={"mdi:hide"} className="text-base"></Icon>
                    <p>Hide replies</p>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
