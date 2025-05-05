import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
export default function CreateForm({ handleCreate }) {
  const [isLoading, setLoading] = useState(0);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: null,
      title: "",
      body: "",
    },
  });
  const load = () => {
    setLoading(true);
  };
  const loadAndSubmit = async (data) => {
    load();
    await handleCreate(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(loadAndSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          {...register("image")}
        />
        <input
          required
          type="text"
          {...register("title")}
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          required
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
      {isLoading && (
        <div className="flex justify-center mt-4">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      )}
    </>
  );
}
