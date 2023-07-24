import Sidebar from "../components/sidebar";
import Hamburger from "../components/hamburger";
import "../Styles/home.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { child, ref } from "firebase/database";
import { db } from "../googleSignIn/config";
import { get } from "firebase/database";


export default function HomePage(){
    const navRef = useRef();
    let [open, setOpen] = useState(false);
    const [dob, setDob]= useState("DD/MM/YYYY");
    const [contact, setContact] = useState("XXXXXXXXXX");
    const [gender, setGender] = useState("Female");
    const [profileImg, setProfile] = useState("https://a0.anyrgb.com/pngimg/130/28/stethoscope-doctor-cartoon-cartoon-doctor-male-doctor-female-doctor-doctors-icon-user-profile-medical-equipment-doctor.png")
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

    const referPatients=()=>{
        navigate('/referedpatients')
        setOpen(!open)
    }


    const Home=()=>{
        navigate('/home')
        setOpen(!open)
    }

    useEffect(()=>{
        const dbref = ref(db);
        get(child(dbref, "DoctorsList/"+localStorage.getItem("currentUserId"))).then((snapshot) =>{
            if(snapshot.exists){
                setDob(snapshot.val()["dob"])
                setContact(snapshot.val()["mobile"])
                if(snapshot.val()["imageUrl"] !=null){
                    setProfile(snapshot.val()["imageUrl"])
                }
                if(snapshot.val()["gender"] !=null){
                    setGender(snapshot.val()["gender"])
                }
            }
        })
        // get(child(db, "DoctorsList/"+localStorage.getItem("currentUserId"))).then((snapshot) => {
        //     if(snapshot.exists()){
        //         console.log("name == "+snapshot.key)
        //     }
        // })
    })
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
            <div className="flex flex-col">
                <div onClick={showNavBar} className="h-1/5 inline p-2 bg-gray-200 lg:hidden">
                    <Hamburger/>
                </div>
                <div className="flex h-4/5">
                <div className="hidden lg:flex w-1/6 bg-emerald-500">
                    <Sidebar/>
                </div>
            
                <div className="top-0 flex w-full lg:w-5/6 h-screen bg-gray-200 justify-center items-center">
                    <div className="m-2 lg:m-0 lg:w-4/5 lg:w-1/3 bg-white rounded-xl border-2 border-gray-300">
                        <div className="flex flex-col  w-full justify-center items-center">
                            {/* Heading of card starts here */}
                        <div >
                            <h1 className="text-sm font-medium lg:text-xl text-emerald-500 mt-2 ">Doctor's Details</h1>
                        </div>

                        {/* Heading of card ends here */}


                        <div className="flex flex-col flex-col-reverse  items-center lg:flex-row w-full gap-1 px-2 pb-3">
                            <div className="flex flex-col m-2 lg:mt-0 w-full gap-1 px-2 justify-center">
                                {/* details part starts here */}

                                <div className="flex gap-2">
                                <p className="text-base font- medium text-sm lg:text-lg font-medium text-emerald-500">Name:</p>
                                <p className="text-base font- medium font-medium">{localStorage.getItem("name")} </p>
                                </div>

                                <div className="flex gap-2">
                                <p className="text-base font- medium text-emerald-500 font-medium">Date of Birth:</p>
                                <p className="text-base font- medium font-medium">{dob} </p>
                                </div>

                                <div className="flex gap-2">
                                <p className="text-base font- medium text-emerald-500 font-medium">Contact:</p>
                                <p className="text-base font- medium font-medium">{contact} </p>
                                </div>
                                

                                <div className="flex gap-2">
                                <p className=" text-base font- medium text-emerald-500 font-medium">Gender:</p>
                                <p className="text-base font- medium font-medium">{gender} </p>
                                </div> 

                                <div className="flex gap-2">
                                <p className="text-base font- medium lg: text-lg text-emerald-500 font-medium">Email:</p>
                                <p className="text-base font- medium font-medium">{localStorage.getItem("email")}</p>
                                </div>  

                                {/* details parts ends here */}
                            </div>


                            {/* Image part start here */}
                            <div className="flex justify-center items-center w-1/2 h-full mt-2 lg:mt-0">
                                <img class="rounded-full border border-gray-100 shadow-sm" src={profileImg} alt="user image" />
                            </div>
                            {/* Image part ends here */}

                        </div>
                    
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
      </>
    )

}



