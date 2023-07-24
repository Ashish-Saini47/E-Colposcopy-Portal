import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faClipboardCheck  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import {  onValue, ref, update } from "firebase/database";
import { db } from "../googleSignIn/config";

export default function ReferedPatientCard(referredId){
    const navigate = useNavigate();
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email@gmail.com")
    const [ contact, setContact] = useState("XXXXXXXXXX")
    const [imgUrl, setUrl] = useState("https://www.w3schools.com/howto/img_avatar2.png")
    const [dob, setDob] = useState("YYYY/MM/DD")
    const [bloodGroup, setBloodGroup] = useState("A+")
    const [address, setAddress] = useState("XXXXXX")
    const [comment, setComment] = useState("")
    const [patientId, setPatientId] = useState("")
    const [doctorId, setDoctorId] = useState("")
    const [docName, setDocName ] = useState("")
    const [docEmail, setDocEmail] = useState("")
    const [docProfile, setDocProfile] = useState("https://www.w3schools.com/howto/img_avatar2.png")
    const [docContact, setDocContact] = useState("")
    const [docDob, setDocDob] = useState("")

    const removepatient=()=>{
        update(ref(db, "referredPatientsList/"+referredId["referredId"]),{
            "status":"removed"
          })
          
    }


    const Examine=()=>{
        localStorage.setItem("currentPatientId",referredId["referredId"])
        localStorage.setItem("patientName", name)
        localStorage.setItem("patientContact", contact)
        localStorage.setItem("patientImageUrl", imgUrl)
        localStorage.setItem("patientDob",dob )
        localStorage.setItem("patientAddress", address)
        localStorage.setItem("patientBloodGroup", bloodGroup)
        localStorage.setItem("comment", comment )
        localStorage.setItem("docName", docName )
        localStorage.setItem("docEmail", docEmail )
        localStorage.setItem("docProfile", docProfile )
        localStorage.setItem("docContact", docContact )
        localStorage.setItem("docDob", docDob)
        localStorage.setItem("referredPatientId", referredId["referredId"])
        navigate('/referedPatientDetails')
    }


    useEffect(()=>{
        console.log("in referedPatientCard")
        // localStorage.setItem("referredPatientId", referredId["referredId"])
        const referredRef = ref(db, "referredPatientsList/"+referredId["referredId"]  );
        onValue(referredRef, (snapshot)=>{
            
            setComment(snapshot.val()["comment"])
            setDoctorId(snapshot.val()["docId"])
            setPatientId(snapshot.val()["patientId"])
            
            
        });
        if(patientId != ""){
            const referredPatientRef = ref(db, "DoctorsList/"+doctorId +"/PatientList/"+ patientId );
            onValue(referredPatientRef, (dataSnapshot)=>{ 
                setName(dataSnapshot.val()["name"])
                setEmail(dataSnapshot.val()["email"])
                setUrl(dataSnapshot.val()["imageUrl"])
                setContact(dataSnapshot.val()["mobile"])
                setDob(dataSnapshot.val()["dob"])
                setBloodGroup(dataSnapshot.val()["bloodGroup"])
                setAddress(dataSnapshot.val()["address"])
            })

        }
        if(doctorId != ""){
            const referredPatientRef = ref(db, "DoctorsList/"+doctorId  );
            onValue(referredPatientRef, (dataSnapshot)=>{
                setDocName(dataSnapshot.val()["name"])
                setDocProfile(dataSnapshot.val()["imageUrl"])
                setDocContact(dataSnapshot.val()["mobile"])
                setDocEmail(dataSnapshot.val()["email"])
                setDocDob(dataSnapshot.val()["dob"])
            })

        }

        
    })



    return(
        <div className="bg-white border-2 border-gray-300 rounded-xl flex flex-col justify-around items-center py-5 h-1/3">
            <div className="flex gap-1 justify-around items-center">
            <div className="w-1/4 p-2">
                <img className="rounded-full border border-gray-100 shadow-sm" src={imgUrl} alt="Patient Image" width="500" height="500" />
            </div>

            <div className="w-3/4 p-2">
                <div className="flex gap-1">
                    <p className="text-emerald-500 w-1/2">Name : </p>
                    <p className="text-gray-600 w-3/4">{name}</p>
                </div>
                <div className="flex gap-1">
                    <p className="text-emerald-500 w-1/2">Doctor's Name : </p>
                    <p className="text-gray-600 w-3/4">{docName}</p>
                </div>

                <div className="flex gap-1">
                    <p className="text-emerald-500 w-1/2">Doctor's Comment : </p>
                    <p className="text-gray-600 w-3/4">{comment}</p>
                </div>

            </div>
            </div>

            <div className="flex justify-around w-3/4">
                <button onClick={removepatient} className="active:scale-[.98] active:duration-75 bg-red-400 pt-2 pb-2 px-5 text-white rounded-xl font-medium hover:bg-white hover:text-red-400 border-2 border-red-400 ease-in-out transition-all"><FontAwesomeIcon icon={faTrash}color="white"/> Remove</button>
                <button onClick={Examine} className="active:scale-[.98] active:duration-75 bg-emerald-400 pt-2 pb-2 px-5 text-white rounded-xl font-medium hover:bg-white hover:text-emerald-400 border-2 border-emerald-400 ease-in-out transition-all"><FontAwesomeIcon icon={faClipboardCheck}color="white" /> Examine</button>
            </div>

        </div>
    );
}