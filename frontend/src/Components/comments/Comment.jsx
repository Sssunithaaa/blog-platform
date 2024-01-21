import React, { useState } from 'react'
import { images, stables } from '../../constants'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { IoIosMore } from 'react-icons/io'
import { FaTrashAlt } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import CommentForm from './CommentForm'
import { useMutation } from '@tanstack/react-query'
const ExtraHandler = () => {
  const [dropdown, setDropDown] = useState(false)
  const [show, setShow] = useState(false)
  const toggleDrop = () => {
    setDropDown(true)
    setShow((curState) => !curState)
  }
  const toggleUp = () => {
    setDropDown(false)
  }

  return (
    <div className="">
      <IoIosMore
        onMouseOver={toggleDrop}
        onMouseOut={toggleUp}
        onClick={toggleDrop}
        className="ml-3 mt-3"
      />
      {show && (
        <div className=" ">
          <ul
            className={` absolute z-50 rounded-lg border-2 p-1 group-hover:block`}
          >
            <li className="px-3 py-1 font-sans text-sm font-semibold hover:rounded-sm hover:bg-gray-300">
              Report user
            </li>
            <li className="px-3 py-1 font-sans text-sm font-semibold hover:rounded-sm hover:bg-gray-300">
              Block user
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
const Comment = ({
  comment,
  loginUserId,
  affected,
  setAffected,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const [fill, setFill] = useState(false)
  const clickHandler = () => {
    setFill(!fill)
  }

  const isUserLoggined = Boolean(loginUserId)
  const comBelongsToUser = loginUserId === comment.user._id
  const isReplying =
    affected && affected.type === 'replying' && affected._id === comment._id
  const isEditing =
    affected && affected.type === 'edit' && affected._id === comment._id
  const repliedId = parentId ? parentId : comment._id
  const replyOnUserId = comment.user._id
  const deleteHandler = () => {
    console.log(comment._id)
    deleteComment(comment._id)
  }
  return (
    <div className="flex flex-nowrap items-start">
      <img
        src={
          comment?.user?.avatar
            ? stables.uploadFolderBaseUrl + comment.user.avatar
            : images.woman
        }
        alt="user"
        className="my-2 h-12 w-12 rounded-full"
      ></img>
      <div className="flex flex-col">
        <div className=" mx-3 mb-3 h-full w-full rounded-lg pb-2 text-start">
          <h3 className="ml-3 mt-2 text-sm font-bold">{comment.user.name}</h3>
          {!isEditing && (
            <h3 className="ml-3 mt-2 text-sm font-semibold">
              {comment.description}
            </h3>
          )}
          <div className="flex flex-row">
            <span className="ml-3 mt-4 pb-3 text-xs font-semibold">
              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
              })}
            </span>
            {isEditing && (
              <CommentForm
                className="ml-3"
                formSubmitHandler={(value) => updateComment(value, comment._id)}
                formCancelHandler={() => setAffected(null)}
              />
            )}
            {isUserLoggined && (
              <div className="flex flex-row">
                <button
                  onClick={() =>
                    setAffected({ type: 'replying', _id: comment._id })
                  }
                >
                  <h3 className="ml-5 mt-3 pb-3 text-sm font-semibold text-slate-700">
                    Reply
                  </h3>
                </button>
                {fill ? (
                  <FaHeart
                    className="ml-3 mt-3 h-5 w-5"
                    onClick={clickHandler}
                  />
                ) : (
                  <FaRegHeart
                    className="ml-3 mt-3 h-5 w-5"
                    onClick={clickHandler}
                  />
                )}
                <ExtraHandler />
                {comBelongsToUser && (
                  <div className="flex flex-row">
                    <button
                      className="mb-3"
                      onClick={() =>
                        setAffected({ type: 'edit', _id: comment._id })
                      }
                    >
                      <FaRegEdit className="ml-4 mt-3 h-5 w-5" />
                    </button>
                    <button className="mb-3">
                      <FaTrashAlt
                        className="ml-3 mt-3 h-4 w-4"
                        onClick={() => deleteComment(comment._id)}
                      />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ml-5">
          {isReplying && (
            <CommentForm
              formSubmitHandler={(value) =>
                addComment(value, repliedId, replyOnUserId)
              }
              formCancelHandler={() => setAffected(null)}
            />
          )}
        </div>
        {replies?.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affected={affected}
                setAffected={setAffected}
                comment={reply}
                deleteComment={deleteComment}
                loginUserId={loginUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              ></Comment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
