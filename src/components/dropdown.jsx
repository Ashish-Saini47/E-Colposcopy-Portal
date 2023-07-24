import React, { useEffect,  useRef, useState } from 'react';
import {RiArrowUpSFill, RiArrowDownSFill} from "react-icons/ri";


function Dropdown() {
    const refClick = useRef(null)
    const [isOpen, setOpen]= useState(false);
    const [genderValue, setValue] = useState("-- Select Gender --");

    const hideOnClickOutSide = (e)=>{
        console.log(refClick.current)
        console.log(e.target)
        if(refClick.current && ! refClick.current.contains(e.target)){
            setOpen(false )
        }
    }
    
    useEffect(()=>{  
        setValue( "Female") 
        localStorage.setItem("gender","Female");
        document.addEventListener("click", hideOnClickOutSide, true)
    },[])
    const maleClicked=()=>{
        setValue( "Male"); 
        localStorage.setItem("gender","Male"); 
        setOpen((prev)=> !prev )
    }
    const femaleClicked=()=>{
        setValue( "Female"); 
        localStorage.setItem("gender","Female"); 
        setOpen((prev)=> !prev )
    }
    const otherClicked=()=>{
        setValue( "Other"); 
        localStorage.setItem("gender","Other"); 
        setOpen((prev)=> !prev )
    }

  return (
    <div ref={refClick} className='relative flex flex-col items-center w-full border-2 border-gray-100 p-4 rounded-xl'>
        <button  className="flex justify-between w-full text-lg" onClick={()=> setOpen((prev)=> !prev )}>
            {genderValue}
            {
                !isOpen?(
                    <RiArrowDownSFill size={25} color='gray'/>
                ):(
                    <RiArrowUpSFill size={25} color='gray'/>
                )
            }
        </button>
        {
            isOpen &&(
                <div className='absolute top-16 flex flex-col items-start w-full border-2 border-gray-100 p-4 rounded-sm bg-white z-10'>
                  
                        <div onClick={maleClicked} className='flex justify-start p-2 cursor-pointer w-full hover:bg-gray-200 hover:border-l-8 border-emerald-500 ease-in-out transition-all text-lg font-bold rounded-r-md'>
                            <h1>Male</h1>
                            
                        </div>
                    
                    <div onClick={femaleClicked} className='flex justify-start p-2 cursor-pointer w-full hover:bg-gray-200 hover:border-l-8 border-emerald-500 ease-in-out transition-all text-lg font-bold rounded-r-md'>
                        <h3>Female</h3>
                        
                    </div>
                    <div onClick={otherClicked} className='flex justify-start p-2 cursor-pointer w-full hover:bg-gray-200 hover:border-l-8 border-emerald-500 ease-in-out transition-all text-lg font-bold rounded-r-md'>
                        <h3>Other</h3>
                    </div>
                </div>
            )
        }

    </div>
  )
}

export default Dropdown;