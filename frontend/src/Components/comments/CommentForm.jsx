import React from 'react'
import { useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'
const CommentForm = ({
  formSubmitHandler,
  formCancelHandler = null,
  loading = false,
}) => {
  const [value, setValue] = useState('')
  const SubmitHandler = (e) => {
    console.log(value)
    e.preventDefault()
    formSubmitHandler(value)
    setValue('')
  }

  return (
    <form onSubmit={SubmitHandler}>
      <div className="flex items-end">
        <textarea
          className="w-full rounded-lg border-2 border-slate-400 p-2 text-start focus:outline-none"
          rows="1"
          placeholder="Add a comment"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {formCancelHandler && (
          <button
            className="rounded-lg border-red-500 "
            onClick={formCancelHandler}
          >
            <MdCancel className="m-3 h-5 w-5" />
          </button>
        )}

        {value.length > 0 ? (
          <button type="submit">
            <IoSendSharp
              disabled={loading}
              className="m-3 h-5 w-5 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </form>
  )
}

export default CommentForm
