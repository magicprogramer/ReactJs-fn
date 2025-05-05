import { useContext } from "react";
import { PostContext } from "../App";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
export default function EditForm({ handleEdit }) {
  const { id } = useParams();
  const navigator = useNavigate();
  const post = useContext(PostContext).find((post) => post.id == id);
  useEffect(() => {
    if (!post) {
      navigator("/");
    }
  }, [post, navigator]);

  if (!post) return null;
  console.log(post.title);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
      });
    }
  }, [post, reset]);
  const onSubmit = (data) => handleEdit(id, data);
  console.log("the data " + id, post);
  return (
    <>
      <div className="flex justify-center items-center">
        <img src={post.image} className="w-[40vw] h-[40vh] object-cover" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input
          required
          type="text"
          {...register("title")}
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          {...register("body")}
          type="text"
          placeholder="title"
          className="input input-bordered block"
        />

        <button type="submit" className="btn btn-primary hover:bg-blue-500">
          Edit
        </button>
      </form>
      <h1>post {post.title}</h1>
    </>
  );
}
