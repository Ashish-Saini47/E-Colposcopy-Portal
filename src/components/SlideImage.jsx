import React from 'react'


function SlideImage({imageUrl, showImage}) {
  const displayImage=()=>{
    localStorage.setItem("openedImage",imageUrl)
    showImage()

  }
    // console.log(imageDate)
    // const showImage =()=>{
    //   console.log("clicked")
    //   localStorage.setItem("openedImage",imageUrl )
    // }
  return (
    <>
      <div  className='flex flex-col items-center min-w-1 lg:min-w-1/3 z-0'>
      <img onClick={displayImage} className="rounded-xl border border-gray-100 shadow-sm cursor-pointer h-96 w-full object-fill" src={imageUrl} alt="Patient Image"  />
      </div>
    </>
    
  )
}

export default SlideImage