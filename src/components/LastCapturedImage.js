export default function LastCapturedImage(){
    return(
        <div className='flex flex-col items-center'>
            <img className="rounded-xl border border-gray-100 shadow-sm hover:scale-[1.03] ease-in-out transition-all cursor-pointer" src="https://img.freepik.com/free-photo/portrait-young-beautiful-woman-with-smoky-eyes-makeup-pretty-young-adult-girl-posing-studio-closeup-attractive-female-face_186202-4439.jpg?w=826&t=st=1686639396~exp=1686639996~hmac=1a0dc89bb7fc1cb583649757ba38593e39a86c4ad876fe80b9e9c460b2af08e9" alt="Patient Image"  />
            <p className='text-xl font-medium text-gray-500'><span className='text-emerald-500'>Date :-</span> 24-10-1999</p>
        </div>
    );
}