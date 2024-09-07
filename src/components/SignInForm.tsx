import { inMemoryPersistence, signInWithEmailAndPassword } from "firebase/auth"
import React from "react"

import { auth } from "../firebase/client"

// auth.setPersistence(inMemoryPersistence)

const SignInForm = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if (!email || !password) {
      return
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()
    const response = await fetch("/api/auth/signin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })

    if (response.redirected) {
      window.location.assign(response.url)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label>Email</label>
      <input type="email" name="email" className="text-gray-500 rounded-sm" />
      <label>Password</label>
      <input type="password" name="password" className="text-gray-500 rounded-sm" />
      <button type="submit" className="bg-leaf-300 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  )
}

export default SignInForm
