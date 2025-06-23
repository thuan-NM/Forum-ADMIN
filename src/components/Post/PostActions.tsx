import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { PostResponse } from "../../store/interfaces/postInterfaces";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/posts/useDeletePost";
import { useUpdatePostStatus } from "../../hooks/posts/useUpdateAnswerStatus";

interface PostActionsProps {
  post: PostResponse;
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const navigate = useNavigate();
  const { DeletePost } = useDeletePost();
  const { UpdatePostStatus } = useUpdatePostStatus();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon="lucide:more-vertical" className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions">
        <DropdownItem
          key="view"
          startContent={<Icon icon="lucide:eye" />}
          onPress={() => navigate(`/posts/${post.id}`)}
        >
          View
        </DropdownItem>
        {post.status === "pending" ? (
          <>
            <DropdownItem
              key="archive"
              startContent={<Icon icon="mdi:tag-approve-outline" />}
              color="success"
              onPress={() => UpdatePostStatus(post.id, "approved")}
            >
              Approve
            </DropdownItem>

            <DropdownItem
              key="restore"
              startContent={<Icon icon="lucide:rotate-ccw" />}
              color="danger"
              onPress={() => UpdatePostStatus(post.id, "rejected")}
            >
              Reject
            </DropdownItem>
          </>
        ) : null}

        <DropdownItem
          key="delete"
          startContent={<Icon icon="lucide:trash" />}
          color="danger"
          onPress={() => DeletePost(post.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostActions;
