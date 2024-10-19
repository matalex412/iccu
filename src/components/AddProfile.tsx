import React from "react"

import FormModal from "./FormModal"
import ModalFormInput from "./ModalFormInput"

const AddProfile = () => (
  <FormModal title="Add Profile" endpoint="/api/profile">
    <ModalFormInput
      label="Profile Picture"
      className="text-gray-500"
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
      label="Bio"
      inputProps={{
        type: "text",
        name: "bio",
        id: "bio",
        placeholder: "Enter bio here",
        required: true,
      }}
    />
  </FormModal>
)

export default AddProfile
