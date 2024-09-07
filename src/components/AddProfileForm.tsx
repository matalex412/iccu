import React from "react";
import ModalFormInput from "./ModalFormInput";

const AddProfileForm = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    await fetch("/api/profile", {
        method: "POST",
        body: formData,
    });
  };

  return (
    <form onSubmit={onSubmit} className="p-5 flex flex-col gap-5">
      <ModalFormInput
        label="Profile Picture"
        className="text-gray-500 dark:text-white"
        inputProps={{
          type: "file",
          name: "profilePicture",
          id: "profilePicture",
          required: true,
        }}
      />
      <ModalFormInput
        label="Name"
        inputProps={{
          type: "text",
          name: "name",
          id: "name",
          placeholder: "Enter name here",
          required: true,
        }}
      />
      <ModalFormInput
        label="Role"
        inputProps={{
          type: "text",
          name: "role",
          id: "role",
          placeholder: "Enter role here",
          required: true,
        }}
      />
      <ModalFormInput
        label="Course and Year"
        inputProps={{
          type: "text",
          name: "yearCourse",
          id: "yearCourse",
          placeholder: "E.g. 2nd year Maths",
        }}
      />
      <ModalFormInput
        label="Verse"
        inputProps={{
          type: "text",
          name: "verse",
          id: "verse",
          placeholder: "e.g. John 3:16",
          required: true,
        }}
      />
      <ModalFormInput
        label="Bio"
        inputProps={{
          type: "text",
          name: "bio",
          id: "bio",
          placeholder: "Enter bio here",
          required: true,
        }}
      />
      <button
        type="submit"
        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="me-1 -ms-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Add Profile
      </button>
    </form>
  );
};

export default AddProfileForm;
