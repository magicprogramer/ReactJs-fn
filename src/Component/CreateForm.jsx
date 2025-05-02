import React from 'react'
import { useForm } from 'react-hook-form'
export default function CreateForm({handleCreate}) {
  const {register, handleSubmit} = useForm(
    {
      defaultValues:{
        title:"",
        body:"",
        image:""
      }
    }
  );

  return (
    <form
  onSubmit={handleSubmit(handleCreate)}
  className="flex flex-col gap-4 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
>
  <input
    type="text"
    {...register("title")}
    placeholder="Title"
    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="text"
    {...register("image")}
    placeholder="Enter image URL"
    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <textarea
    {...register("body")}
    cols="30"
    rows="10"
    placeholder="Body block"
    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />

  <button
    type="submit"
    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
  >
    Post
  </button>
</form>

  )
}
