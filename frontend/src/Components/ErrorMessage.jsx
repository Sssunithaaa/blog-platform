import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-2 text-center font-sans text-3xl font-bold text-gray-900">
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
