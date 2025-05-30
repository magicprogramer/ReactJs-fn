import React from "react";
import { Link } from "react-router-dom";
export default function NavBar({ handleLogout }) {
  return (
    <div>
      {localStorage.getItem("token") ? (
        <>
          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleLogout}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Logout
          </button>
          <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            <div className="border-t-2 border-gray-300 pt-2">
              <span className="text-sm text-gray-700">
                {localStorage.getItem("user")}
              </span>
            </div>
          </div>
        </>
      ) : (
        <Link to="/login">
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login
          </button>
        </Link>
      )}
      {!localStorage.getItem("token") && (
        <Link to="/register">
          <button className="btn bg-white text-black border-[#e5e5e5]">
            register
          </button>
        </Link>
      )}
    </div>
  );
}
