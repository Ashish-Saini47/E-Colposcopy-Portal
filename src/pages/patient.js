import Sidebar from "../components/sidebar"
import { useState } from "react";
import Hamburger from "../components/hamburger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import PatientLists from "../components/PatientLists";

export default function PatientsPage(){
    let [open, setOpen] = useState(false);
    const showNavBar =()=>{
        setOpen(!open)
    }
    const navigate = useNavigate();
    const Logout=()=>{
        localStorage.clear()
        // window.location.reload()
        navigate('/login')
        setOpen(!open)

    }

    const Patients=()=>{
        navigate('/patients')
        setOpen(!open)
    }


    const Home=()=>{
        navigate('/home')
        setOpen(!open)
    }

    const referPatients=()=>{
        navigate('/referedpatients')
        setOpen(!open)
    }
    return(
        <div className="w-full h-auto bg-gray-200 ">

        <div className={(open ? "block" : "hidden")}>
        
        <div className="flex flex-col bg-emerald-500 z-50 ">
            <div onClick={showNavBar} className="flex w-11 h-10 justify-center border-2 border-gray-200 bg-emerald-500 right-0 items-center mt-2 ml-2">
                <FontAwesomeIcon icon={faWindowClose} size="2x" color="White"></FontAwesomeIcon>
            </div>
            <div className="flex w-full px-5 flex-col h-screen gap-3 text-left justify-center font-semibold text-xl bg-emerald-500 text-white border-r-2 border-r-gray-200">
            <p onClick = {Home} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Home</p>
            <p onClick = {Patients} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Patients</p>
            <p onClick={referPatients} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Refered Patients</p>
            <p onClick={Logout}className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Logout</p>
        </div>
        </div>
        </div>
        <div className={(open ? "hidden" : "block")}>
            <div className="flex flex-col">
                <div onClick={showNavBar} className=" fixed w-full left-0 bg-gray-200 lg:hidden">
                    <Hamburger/>
                </div>
                <div className="flex h-4/5 mt-14 lg:mt-0">
                <div className="hidden lg:flex w-1/6 bg-emerald-500 fixed left-0">
                    <Sidebar/>
                </div>

                <div>
                <SearchBar navigatePage={"searchPatient"}/>
                <div className="lg:absolute top-32 lg:top-20 right-0 w-full">
                <PatientLists/>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
       
    )
    }