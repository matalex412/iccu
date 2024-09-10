import React from "react"

import { auth } from "../firebase/client"

const SignOutForm = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await auth.signOut()

    const response = await fetch("/api/auth/signout", {
      method: "GET",
    })

    if (response.redirected) {
      window.location.assign(response.url)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <button
        className="block p-2 rounded-sm w-full text-start bg-leaf-300 hover:text-leaf-500 hover:bg-gray-100"
        type="submit"
      >
        Sign out
      </button>
    </form>
  )
}

export default SignOutForm
