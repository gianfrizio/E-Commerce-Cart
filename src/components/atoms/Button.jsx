import React from 'react'

export default function Button({ children, className = '', onClick, ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
