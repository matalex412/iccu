import React from "react";
import FormInput from "./FormInput";

const AddEventForm = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    await fetch("/api/event", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <form onSubmit={onSubmit} className="p-5 flex flex-col gap-5">
      <FormInput
        label="Event Name"
        inputProps={{
          type: "text",
          name: "name",
          id: "name",
          placeholder: "e.g. Curious",
          required: true,
        }}
      />
      <FormInput
        label="Event Date"
        inputProps={{
          type: "date",
          name: "date",
          id: "date",
          required: true,
        }}
      />
      <FormInput
        label="Number of Weeks"
        inputProps={{
          type: "number",
          name: "repeat",
          id: "repeat",
          placeholder: "How many weeks in a row this event will occur",
          required: true,
        }}
      />

      <button
        type="submit"
        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="me-1 -ms-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Add Event
      </button>
    </form>
  );
};

export default AddEventForm;
