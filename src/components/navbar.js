import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Navbar(){

    let [open, setOpen] = useState(true);
    const hideNavBar =()=>{
        setOpen(!open)
        // navRef.current.classList.toggle("resposive_nav_visible")

    }

    const navigate = useNavigate();
    const Logout=()=>{
        localStorage.clear()
        // window.location.reload()
        navigate('/login')

    }

    const Patients=()=>{
        navigate('/patients')
    }

    const ReferedPatientsPage=()=>{
        navigate('/referedpatients')
    }


    const Home=()=>{
        navigate('/home')
    }

    return(
        <div className="flex flex-col bg-emerald-500 ">
            <div onClick={hideNavBar} className="flex w-11 h-10 justify-center border-2 border-gray-200 bg-emerald-500 right-0 items-center mt-2 ml-2">
                <FontAwesomeIcon icon={faWindowClose} size="2x" color="White"></FontAwesomeIcon>
            </div>
            <div className="flex w-full px-5 flex-col h-screen gap-3 text-left justify-center font-semibold text-xl bg-emerald-500 text-white border-r-2 border-r-gray-200">
            <p onClick = {Home} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Home</p>
            <p onClick = {Patients} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Patients</p>
            <p onClick = {ReferedPatientsPage} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Refered Patients</p>
            <p onClick={Logout}className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Logout</p>
        </div>
        </div>
    )
}