import React from 'react'

function UploadSuccessDialog({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 '>
        <div className='bg-white p-5 pb-20 rounded-xl text-2xl text-gray-700 border-2 border-gray-300 relative'> 
            Image Uploaded Successfully
            <div onClick={onClose} className='active:scale-[.98] active:duration-75 hover:scale-[1.10] ease-in-out transition-all cursor-pointer text-xl text-emerald-500 border-2 border-emerald-500 absolute right-5 mt-5 p-2 pl-5 pr-5 rounded-xl shadow-lg'>
                OK
            </div>
        </div>
    </div>
  )
}

export default UploadSuccessDialog