import React from 'react'
import { useForm } from 'react-hook-form'
import MainLayout from '../../Components/MainLayout'
import CTA from '../container/CTA'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin } from '../../services/index/user'
import { useEffect } from 'react'
import { userActions } from '../../store/reducers/userReducers'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return signin({ email, password })
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data))
      localStorage.setItem('account', JSON.stringify(data))
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    },
  })
  useEffect(() => {
    if (userState.userInfo) {
      navigate('/')
    }
  }, [navigate, userState.userInfo])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const { email, password } = data
    mutate({ email, password })
  }
  return (
    <MainLayout>
      <section className="container mx-auto my-5 px-5 py-5">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="px-5 text-center font-sans text-2xl font-bold  text-dgreen">
            SIGN IN
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 max-w-[30rem] border-2 border-slate-300 p-7"
          >
            <div className="my-4">
              <label
                className="mb-2 block text-lg font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              {/*className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
              <input
                type="text"
                className="focus:shadow-outline w-full appearance-none rounded border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="Enter email"
                name="email"
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
              />
              {errors.email && (
                <p className="ml-4 mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="my-4">
              <label
                className="mb-2 block text-lg font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="focus:shadow-outline w-full appearance-none rounded border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="Enter password"
                name="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 1,
                    message: 'Password field cannot be empty',
                  },
                })}
              />
              {errors.password && (
                <p className="ml-4 mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="hover:scale-120 mx-auto my-5 flex rounded-lg border-2 border-blue-700 bg-blue-700 px-20 py-1 font-sans text-xl font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 "
            >
              Login
            </button>
            <div className="my-2">
              <h3 className="ml-4 font-sans font-medium">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-700">
                  Register
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </section>
      <CTA></CTA>
    </MainLayout>
  )
}

export default LoginForm
