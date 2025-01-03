"use client";
import { signOut } from "next-auth/react";
import React from 'react'

export default function SignOutButton() {
  return (
    <div>
      <button
        className='bg-orange-300 rounded-md p-2'
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}>
        Signout
      </button>
    </div>
  )
}