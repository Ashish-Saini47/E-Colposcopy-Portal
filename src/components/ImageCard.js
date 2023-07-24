import pdf_thumb from "../static/pdf_thumb.png"
export default function ImageCard(){
    return(
        <div className="flex flex-col items-center">
            <img className="rounded-xl border border-gray-100 shadow-sm" src={pdf_thumb} alt="Patient Image"  />
            <p className='text-xl font-medium text-gray-500'><span className='text-emerald-500'>Date :-</span> 24-10-1999</p>
        </div>
    )
}