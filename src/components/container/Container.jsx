import React from 'react'

function Container({children, className=""}) {
  return (
    <div className={`w-full max-w-7xl px-5 ${className} mx-auto text-white bg-gray-50 dark:bg-slate-900`}>{children}</div>
  )
}

export default Container