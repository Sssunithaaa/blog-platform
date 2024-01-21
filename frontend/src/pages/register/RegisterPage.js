import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import MainLayout from '../../Components/MainLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signup } from '../../services/index/user'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/reducers/userReducers'
import CTA from '../container/CTA'
const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password })
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
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })
  const submitHandler = (data) => {
    console.log(data)
    const { name, email, password } = data
    mutate({ name, email, password })
  }

  const password = watch('password')
  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-5">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="px-5 text-center font-sans text-2xl font-bold  text-dgreen">
            SIGN UP
          </h1>
          <form
            className=" my-5 h-auto w-full rounded-lg border-2 px-7 py-5  font-sans "
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="ml-2 mt-5 w-[90%]">
              <label
                htmlFor="email"
                className=" mx-auto ml-3 text-lg font-semibold"
              >
                Email
              </label>
              <input
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email format is invalid',
                  },
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                })}
                className={`placeholder: mt-3  block h-[35px] w-full content-center border-2 px-5 outline-none  ${
                  errors.email ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                type="email"
                placeholder="Enter your email"
              ></input>
              {errors.email?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="ml-2 mt-5 w-[90%]">
              <label
                htmlFor="name"
                className="mx-auto ml-3 text-lg font-semibold"
              >
                Name
              </label>
              <input
                {...register('name', {
                  minLength: {
                    value: 1,
                    message: 'Name must include atleast one character',
                  },
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
                className={`placeholder: mt-3 block h-[35px] w-full content-center border-2 px-5  outline-none  ${
                  errors.name ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                type="text"
                placeholder="Enter your name"
              ></input>
              {errors.name?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="ml-2 mt-5 w-[90%]">
              <label
                htmlFor="password"
                className=" mx-auto ml-3 text-lg font-semibold"
              >
                Password
              </label>
              <input
                {...register('password', {
                  minLength: {
                    value: 8,
                    message: 'Password must contain atleast 8 characters',
                  },
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                })}
                className={`placeholder: mt-3 block h-[35px] w-full content-center border-2 px-5  outline-none ${
                  errors.password ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                type="password"
                placeholder="Enter your password"
              ></input>
              {errors.password?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="ml-2 mt-5 w-[90%]">
              <label
                htmlFor="confirmPassword"
                className=" mx-auto ml-3 text-lg font-semibold"
              >
                Confirm password
              </label>
              <input
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Enter password again',
                  },
                  validate: (value) => {
                    if (password !== value) {
                      return 'Your passwords do no match'
                    }
                  },
                })}
                className={`placeholder: mt-3 block h-[35px] w-full content-center border-2 px-5  outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                type="password"
                placeholder="Confirm password "
              ></input>
              {errors.confirmPassword?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="hover:scale-120 mx-auto my-5 flex rounded-lg border-2 border-blue-700 bg-blue-700 px-20 py-1 font-sans text-xl font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 "
            >
              Register
            </button>
            <div>
              <h3 className="ml-4 font-sans font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-800">
                  Login
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

export default RegisterPage
