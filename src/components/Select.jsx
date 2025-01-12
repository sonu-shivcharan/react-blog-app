import React, { useId } from 'react'

function Select({label, options, className="", ...props}, ref) {
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block pl-1 mb-1 '></label>}
        <select ref={ref} {...props} className={`border ${className}`} id={id}>
            {options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)