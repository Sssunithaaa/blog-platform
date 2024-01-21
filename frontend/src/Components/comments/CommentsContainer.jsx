import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/index/comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const CommentsContainer = ({ classname, loginUserId, comments, postSlug }) => {
  const [comment, setComment] = useState([]);
  const userState = useSelector((state) => state.user);
  const [affected, setAffected] = useState(null);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, description, slug, parent, replyOnUser, check }) => {
      return createComment({
        token,
        description,
        slug,
        parent,
        replyOnUser,
        check,
      });
    },
    onSuccess: () => {
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: commentMutation } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: () => {
      toast.success("Comment delete successfully");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const { mutate: mutateComment, isLoading: updateLoading } = useMutation({
    mutationFn: ({ token, description, commentId }) => {
      return updateComment({ token, description, commentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", postSlug]);
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteCommentHandler = (commentId) => {
    commentMutation({ token: userState.userInfo.token, commentId });
  };

  const addCommentHandler = (
    value,
    parent = null,
    replyOnUser = null,
    check = true
  ) => {
    mutate({
      description: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
      check,
    });
    setAffected(null);
  };
  const updateCommentHandler = (value, commentId) => {
    mutateComment({
      description: value,
      token: userState.userInfo.token,
      commentId,
    });
    setAffected(null);
  };

  return (
    <div className={`${classname}`}>
      <CommentForm
        className="ml-3"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoading}
      />
      <div className="mt-8 space-y-4">
        {comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            loginUserId={loginUserId}
            affected={affected}
            setAffected={setAffected}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
