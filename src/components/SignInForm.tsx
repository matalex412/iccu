import React from "react";
import ModalFormInput from "./ModalFormInput";
import { getAuth, inMemoryPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/client";

const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);

const SignInForm = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return;
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    const response = await fetch("/api/auth/signin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (response.redirected) {
      window.location.assign(response.url);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-5 flex flex-col gap-5">
      <ModalFormInput
        label="Email"
        inputProps={{
          type: "email",
          name: "email",
          id: "email",
          placeholder: "Enter email here",
          required: true,
        }}
      />
      <ModalFormInput
        label="Password"
        inputProps={{
          type: "password",
          name: "password",
          id: "password",
          placeholder: "Enter password here",
          required: true,
        }}
      />
      <button type="submit" className="bg-leaf-300 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
