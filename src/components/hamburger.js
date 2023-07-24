import * as Reac from 'react';

export default function Hamburger(){
    return(
        <div className='flex justify-center items-center bg-gray-200 w-12 h-12 rounded active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all cursor-pointer'>
            <div className="flex flex-col bg-gray-200 w-10 h-10 border-2 border-emerald-500  rounded">
            <div className='w-4/5 bg-emerald-500 h-4 m-1 rounded'></div>
            <div className='w-4/5 bg-emerald-500 h-4 m-1 rounded'></div>
            <div className='w-4/5 bg-emerald-500 h-4 m-1 rounded'></div>
        </div>
        </div>
    );
}