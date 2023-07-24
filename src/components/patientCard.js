import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  get } from "firebase/database";
import { onValue, ref } from "firebase/database";
import { db } from "../googleSignIn/config";


export default function PatientCard(patientId){
    const navigate = useNavigate();
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email@gmail.com")
    const [ contact, setContact] = useState("XXXXXXXXXX")
    const [imgUrl, setUrl] = useState("https://www.w3schools.com/howto/img_avatar2.png")
    const [dob, setDob] = useState("YYYY/MM/DD")
    const [bloodGroup, setBloodGroup] = useState("A+")
    const [address, setAddress] = useState("XXXXXX")
    const examine=()=>{
        localStorage.setItem("currentPatientId",patientId["patientId"])
        localStorage.setItem("patientName", name)
        localStorage.setItem("patientContact", contact)
        localStorage.setItem("patientImageUrl", imgUrl)
        localStorage.setItem("patientDob",dob )
        localStorage.setItem("patientAddress", address)
        localStorage.setItem("patientBloodGroup", bloodGroup)
        navigate('/patientsdetails')
    }
    useEffect(()=>{
        const patientRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/"+patientId["patientId"]);
        
        onValue(patientRef, (snapshot)=>{
            setName(snapshot.val()["name"])
            setEmail(snapshot.val()["email"])
            setUrl(snapshot.val()["imageUrl"])
            setContact(snapshot.val()["mobile"])
            setDob(snapshot.val()["dob"])
            setBloodGroup(snapshot.val()["bloodGroup"])
            setAddress(snapshot.val()["address"])
            
        });
    })
    return(
        <div className="flex flex-col items-center rounded-xl w-full h-min bg-white border-2 border-gray-200 p-1 hover:scale-[1.03] ease-in-out transition-all cursor-pointer">
            <h1 className="font-bold text-lg text-emerald-500 mt-1 mb-3">{name}</h1>
            
            <img class="rounded-full border border-gray-100 shadow-sm h-1/2 w-1/2 mb-3" src={imgUrl} alt="user image" />
            
            <p className="break-all font-medium text-gray-500 text-center ">{email}</p>
            <p className="font-medium text-gray-500 mb-2">{contact}</p>
            <button onClick = {examine} className="active:scale-[.98] active:duration-75 font-medium bg-emerald-500 rounded-xl pl-4 pr-4 pt-2 pb-2 text-white hover:bg-white hover:text-emerald-500 border-2 border-emerald-500 ease-in-out transition-all mb-1">Examine</button>
        </div>
    );

}