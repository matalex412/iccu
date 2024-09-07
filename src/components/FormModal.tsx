import React, { type FormEvent, type FC, useState, type ReactNode } from "react"
import Modal from "react-modal"


Modal.setAppElement("#main")

interface FormModalProps {
  title: string,
  endpoint: string,
  children: ReactNode,
}

const FormModal: FC<FormModalProps> = ({
  title,
  endpoint,
  children,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const { message } = await res.json()
      setError(message)
    } else {
      setError("")
      closeModal()
    }
  }

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button onClick={openModal} 
        className="text-white p-3 rounded-sm items-center bg-leaf-400 hover:bg-leaf-500"
      >{title}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed z-50 inset-0 bg-white/[.75]"
      >
        <div className="p-5 flex flex-col gap-5">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                ></path>
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-100 text-red-800 border border-red-300 p-3 rounded-sm">
                Error: {error}
              </div>
            )}

            {children}

            <button
              type="submit"
              className="text-white inline-flex items-center bg-leaf-400 hover:bg-leaf-500 rounded-sm text-sm px-5 py-2.5"
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
              {title}
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default FormModal
