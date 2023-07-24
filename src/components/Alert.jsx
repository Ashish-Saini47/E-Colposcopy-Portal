import React from 'react'

function Alert(props) {
  return (
    
    <div className='fixed top-0 w-screen z-10 '>
      
        {props.alert && <div className={`${props.alert.bgclass} rounded-lg py-5 px-6 mb-4 text-base ${props.alert.textclass} mb-3`} role='alert'>
            {props.alert.message}
            </div>}
    </div>
  )
}

export default Alert