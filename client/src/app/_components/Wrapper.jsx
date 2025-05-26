import React from 'react'

export default function Wrapper({children,className=""}) {
  return (
    <div className={`max-w-screen-lg lg:max-w-screen-xl mx-auto px-8 lg:px-0 py-20 ${className}`} >{children}</div>
  )
}
