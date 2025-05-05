import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function Post(props) {
  const { post } = props;
  // console.log("props " + props);
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={
              post.image ||
              "data:image/png;base64,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"
            }
            alt={post.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {post.title}

            <div className="badge badge-secondary">
              by : {post.user?.name || "Unknown"}
            </div>
          </h2>
          <p>{post.body}</p>
          {post.user && post.user.name === localStorage.getItem("user") && (
            <div className="card-actions justify-end">
              <div
                className="btn btn-accent"
                onClick={() => {
                  props.handleDelete(post.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>

              <Link to={"/posts/" + post.id + "/edit"}>
                <div className="btn btn-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
