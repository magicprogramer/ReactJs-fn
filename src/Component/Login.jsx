import React from "react";
import { useForm } from "react-hook-form";
export default function Login({ handleLogin }) {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          {...register("name")}
          placeholder="name"
          className="form-control block"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="password"
          className="form-control block"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
