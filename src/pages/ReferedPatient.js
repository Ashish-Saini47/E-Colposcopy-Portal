
import Sidebar from "../components/sidebar";

import SearchBar from "../components/SearchBar";
import { ReferedPatientList } from "../components/ReferedPatientList";
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Hamburger from "../components/hamburger";


export default function ReferedPatient(){
    let [open, setOpen] = useState(false);
    const showNavBar =()=>{
        setOpen(!open)
        // navRef.current.classList.toggle("resposive_nav_visible")
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
        <>
            <div className={(open ? "block" : "hidden")}>
                <div className="flex flex-col bg-emerald-500">
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
                <div className=" w-full  flex">
                    <div className="hidden  fixed w-1/6 bg-emerald-500 lg:flex">
                        <Sidebar/>
                    </div>
                    <div className="flex flex-col h-4/5 w-full lg:w-5/6 ">
                        <div onClick={showNavBar} className="h-1/5 inline p-2 bg-gray-200 lg:hidden">
                            <Hamburger/>
                        </div>
                        <SearchBar/>
                        <div className="lg:absolute top-20 right-0 w-full">
                            <ReferedPatientList/>
                        </div>
                    </div>
                
                </div>
            </div>
        </>
        
    );
}