import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"

import { auth } from "../firebase/client"

const SignInForm = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      const response = await fetch("/api/auth/signin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      if (!response.ok) {
        const { message } = await response.json()
        setError(message)
      } else if (response.redirected) {
        window.location.assign(response.url)
      }
    } catch (error) {
      console.error(error)
      setError("Invalid login details")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-100 text-red-800 borde border-red-300 p-3 rounded-sm">
          Error: {error}
        </div>
      )}
      <label>Email</label>
      <input type="email" name="email" className="text-gray-500 rounded-sm" required />
      <label>Password</label>
      <input type="password" name="password" className="text-gray-500 rounded-sm" required />
      <button
        type="submit"
        className="bg-leaf-300 text-white p-2 rounded disabled:bg-gray-300"
        disabled={loading}
      >
        Sign In
      </button>
    </form>
  )
}

export default SignInForm
