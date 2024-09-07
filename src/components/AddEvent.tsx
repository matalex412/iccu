import React from "react"

import FormModal from "./FormModal"
import ModalFormInput from "./ModalFormInput"

const AddEvent = () => (
  <FormModal title="Add Event" endpoint="/api/event">
    <ModalFormInput
      label="Event Name"
      inputProps={{
        type: "text",
        name: "name",
        id: "name",
        placeholder: "e.g. Curious",
        required: true,
      }}
    />
    <ModalFormInput
      label="Event Date"
      inputProps={{
        type: "date",
        name: "date",
        id: "date",
        required: true,
      }}
    />
    <ModalFormInput
      label="Number of Weeks"
      inputProps={{
        type: "number",
        name: "repeat",
        id: "repeat",
        placeholder: "How many weeks in a row this event will occur",
        required: true,
      }}
    />
  </FormModal>
)

export default AddEvent
