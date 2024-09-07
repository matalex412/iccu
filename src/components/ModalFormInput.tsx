import React, { type FC, type InputHTMLAttributes } from "react"

interface Props {
  label: string
  inputProps: InputHTMLAttributes<HTMLInputElement>
  className?: string
}

const ModalFormInput: FC<Props> = ({ label, inputProps, className }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={inputProps.id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        className={
          className
            ? className
            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        }
        {...inputProps}
      />
    </div>
  )
}

export default ModalFormInput
