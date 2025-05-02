import React from 'react'
import { useForm } from 'react-hook-form'
export default function RegisterForm({handleRegister}) {
  const {register, handleSubmit} = useForm(
    {
      defaultValues:{
        name:"",
        password:""
      }
    }
  );
  return (
    <form
    onSubmit={handleSubmit(handleRegister)}
    className="flex flex-col gap-4 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
  >
    <input
      type="text"
      {...register("name")}
      placeholder="enter a username"
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    <input
      type="text"
      {...register("password")}
      placeholder="Enter password"
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    <button
    type="submit"
    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    >
        Register
    </button>
  </form>
  )
}
