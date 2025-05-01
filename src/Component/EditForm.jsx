import { useContext } from "react";
import { PostContext } from "../App";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
export default function EditForm({handleEdit}) {
    const {id} = useParams();
    const post = useContext(PostContext).find((post)=>post.id == id);
    console.log(post.title);
    const {register, handleSubmit} = useForm(
      {
        defaultValues:{
          title:post.title,
          body:post.body
        }
      }
    )
    const onSubmit = (data)=>handleEdit(id, data);
    console.log(id, post);
    return (
      <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} type="text" placeholder="title" className="input input-bordered block"/>
        <textarea cols="30" rows="10" {...register("body")} type="text" placeholder="body" className="input input-bordered block"></textarea>

        <button type="submit" className="btn btn-primary hover:bg-blue-500">Edit</button>
      </form>
        <h1>post {post.title}</h1>
      </>
  );
}
