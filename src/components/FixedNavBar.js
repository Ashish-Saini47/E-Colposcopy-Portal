import { useNavigate } from "react-router-dom";
export default function FixedNavBar(){
    const navigate = useNavigate();
    const goBack=()=>{
        navigate('/patients')
    }

    const goHome=()=>{
        navigate('/home')
    }
    return(
        <div className=" w-full bg-emerald-500 p-5">
        <div className="flex justify-between">
            <div>
                <h1 className="text-sm lg:text-2xl text-white font-medium">Patients Details </h1>
            </div>

            <div className="flex gap-4 lg:gap-10">
                <h1 onClick = {goHome} className="text-xs lg:text-xl text-white active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all cursor-pointer">Dr. {localStorage.getItem("name")} </h1>
                <h1 onClick = {goBack} className="text-xs lg:text-xl text-white active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all cursor-pointer">Go Back</h1>
            </div>

        </div>
    </div>
    );
}