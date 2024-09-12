import React, { type FC, type ReactNode } from "react"
import Modal from "react-modal"

Modal.setAppElement("#main")

interface FormModalProps {
  title: string
  isOpen: boolean
  closeModal: () => void
  children?: ReactNode
}

const FormModal: FC<FormModalProps> = ({ title, isOpen, closeModal, children }) => {
  return (
    <Modal
      isOpen={isOpen}
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
        {children}
      </div>
    </Modal>
  )
}

export default FormModal
