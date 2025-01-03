"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SocialLogin from "../components/SocialLogin";

export default function Register() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    console.log("The Auth State is ", authState);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, authState)
      .then((res) => {
        setLoading(false);
        const response = res?.data;
        if (response?.status == 200) {
          router.push(`/login?message=${response?.message}`);
          console.log("User successfully sign up!");
        } else if (response?.status == 400) {
          setErrors(response?.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Something went wrong!", err?.message);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800'>
        <h1 className='text-2xl font-bold text-center'>Register</h1>
        <form onSubmit={submitForm} className='space-y-6'>
          <div className='space-y-1 text-sm'>
            <label htmlFor='name' className='block dark:text-gray-600'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Write Your Full Name'
              className='w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600'
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
            />
            <span className='text-red-500 font-bold'>{errors?.name}</span>
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='email' className='block dark:text-gray-600'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email'
              className='w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600'
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
            <span className='text-red-500 font-bold'>{errors?.email}</span>
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='password' className='block dark:text-gray-600'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Write Your Password'
              className='w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600'
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
            <span className='text-red-500 font-bold'>{errors?.password}</span>
          </div>
          <div className='space-y-1 text-sm'>
            <label
              htmlFor='confirmPassword'
              className='block dark:text-gray-600'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Your Password'
              className='w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600'
              onChange={(e) =>
                setAuthState({
                  ...authState,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>
          <button
            type='submit'
            className={`block w-full p-3 text-center rounded-sm dark:text-gray-50 ${
              loading ? "bg-red-400" : "dark:bg-violet-600"
            }`}
            disabled={loading}>
            {loading ? "Processing" : "Register"}
          </button>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-300'></div>
          <p className='px-3 text-sm dark:text-gray-600'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-300'></div>
        </div>
        {/* Social Login */}
        <SocialLogin loading={loading} setLoading={setLoading} />
        <p className='text-xs text-center sm:px-6 dark:text-gray-600'>
          Already have an account?{" "}
          <Link
            rel='noopener noreferrer'
            href='/login'
            className='underline dark:text-gray-800'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
