import React from 'react'

export default function profile() {
  return (
    <div>
        <h1>
            {localStorage.getItem("user")}
        </h1>
    </div>
  )
}
