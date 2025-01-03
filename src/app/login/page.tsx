"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import SocialLogin from "../components/SocialLogin";

export default function Login() {
  const params = useSearchParams();
  const router = useRouter();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<loginErrorType>({});

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // console.log("The Auth State is ", authState);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, authState)
      .then((res) => {
        setLoading(false);
        const response = res?.data;
        console.log(response);
        if (response?.status == 200) {
          signIn("credentials", {
            email: authState?.email,
            password: authState?.password,
            callbackUrl: "/",
            redirect: true
          })
          router.push(`/`);
          console.log("User successfully login!");
        } else {
          setErrors(response?.errors);
          console.log(errors);
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
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        {params?.get("message") ? (
          <p className='bg-gray-400 font-bold rounded-md p-4'>
            {params?.get("message")}
          </p>
        ) : (
          <></>
        )}
        <form className='space-y-6' onSubmit={submitForm}>
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
            {/* <span className="text-red-500 font-bold">{errors?.email}</span> */}
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='password' className='block dark:text-gray-600'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600'
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
            {/* <span className="text-red-500 font-bold">{errors?.password}</span> */}
            <div className='flex justify-end text-xs dark:text-gray-600'>
              <a rel='noopener noreferrer' href='#'>
                Forgot Password?
              </a>
            </div>
            <p className='text-red-500 font-bold text-center w-full'>
              {errors?.message}
            </p>
          </div>
          <button
            type='submit'
            className={`block w-full p-3 text-center rounded-sm dark:text-gray-50 ${
              loading ? "bg-red-400" : "dark:bg-violet-600"
            }`}
            disabled={loading}>
            {loading ? "Processing" : "Login"}
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
        <SocialLogin/>
        <p className='text-xs text-center sm:px-6 dark:text-gray-600'>
          Don&apos;t have an account?
          <Link
            rel='noopener noreferrer'
            href='/register'
            className='underline dark:text-gray-800'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
