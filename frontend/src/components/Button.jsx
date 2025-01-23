import React from 'react'

export default function Button({type, classes, name}) {
  return (
    <>
        <button type={type} className={`w-full px-4 py-2 text-white rounded-md ${classes}`}>{name}</button>
    </>
  )
}
