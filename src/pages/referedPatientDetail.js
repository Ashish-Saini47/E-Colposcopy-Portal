import PatientProfile from "../components/ProfileCard";
import FixedNavBar from "../components/FixedNavBar";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faUserDoctor, faXmark} from "@fortawesome/free-solid-svg-icons";
import ImageSlider from "../components/ImageSlider";
import { useState } from "react";
import { db, storage } from '../googleSignIn/config';

import { ref, uploadBytesResumable,getDownloadURL  } from 'firebase/storage';

import ProgressBar from '@ramonak/react-progress-bar';
import {  ref as databaseRef, update } from 'firebase/database';


import UploadSuccessDialog from '../components/UploadSuccessDialog';

import { format } from 'date-fns';
import BiopsySlider from "../components/BiopsySlider";
import ReportSlider from "../components/ReportSlider";
import EnlargeImage from "../components/EnlargeImage";
import { useNavigate } from "react-router-dom";

export default function ReferedPatientDetails(){
    const navigate = useNavigate();
    let [open, setOpen] = useState(false)

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("");
    const [file, setFile] =useState(null)
    const [progress, SetProgress] = useState(null)
    const [ showDialog, setShowDialog] = useState(false)

    const showImage =()=>{
        setOpen(true)
    }
    
    const closeImage = ()=>{
        setOpen(false)
    }

    const closeDialog =()=>{
        setImage(null); 
        setFileName(""); 
        SetProgress(null)
        setShowDialog(false)
    }

    const uploadComment = ()=>{
        var comment = document.getElementById("commentBox").value
        update(databaseRef(db, "referredPatientsList/"+localStorage.getItem("referredPatientId")),{
            "doctorsComment":comment
          })
          
    }

    const updateComment=()=>{
        update(databaseRef(db, "referredPatientsList/"+localStorage.getItem("referredPatientId")),{
            "status":"updated"
          })
          navigate('/referedpatients')
    }

    const removepatient=()=>{
        update(databaseRef(db, "referredPatientsList/"+localStorage.getItem("referredPatientId")),{
            "status":"removed"
          })
          navigate('/referedpatients')
    }

    const UploadImage=()=>{
        if(image == null){
            return;
        }
        const storageRef = ref(storage, 'images/doctorUpload/'+fileName); 
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot)=>{
            const progressUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            SetProgress(progressUpload)
            switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                
                let date=format(new Date(), "yyyy-MM-dd");
                console.log("date="+typeof(date));

                let key= Date.now();
                console.log("date="+typeof(key.toString));
                update(databaseRef(db, "referredPatientsList/"+localStorage.getItem("referredPatientId") + "/DoctorUploads"),{
                [key]:downloadURL
              })
            // set(databaseRef(dataRef, key),{
            //     downloadURL
            // });
           
              setShowDialog(true)       
              
            });
          }
        )
    }
    return(
        <div className="bg-gray-200">
            <UploadSuccessDialog onClose={closeDialog} visible={showDialog}/>

            <FixedNavBar/>
            <PatientProfile/>
            <div className="bg-white p-5 mb-5">
                <p className="text-gray-600 text-2xl font-medium"><span className="text-emerald-500">R</span>efered <span className="text-emerald-500">D</span>octor <span className="text-emerald-500">D</span>etails</p>
                {/* patients persnol info */}
                <div className="flex flex-col  items-center lg:flex-row bg-white w-full h-1/2 rounded-xl gap-2 ">
                    <div className="w-1/2 p-5 flex justify-center">
                    <img className="rounded-full border border-gray-100 shadow-sm lg:w-1/2" src={localStorage.getItem("docProfile")} alt="Patient Image" width="500" height="500" />
                    </div>

                    <div className="flex flex-col justify-center lg:p-5 lg:pl-8 lg:w-1/2">
                        <div className="flex gap-2">
                            <p className="text-xl text-emerald-500 lg:w-1/3">Doctor's Name :</p>
                            <p className="text-xl text-gray-600 ">{localStorage.getItem("docName")}</p>
                        </div>

                        <div className="flex gap-2">
                            <p className="text-xl text-emerald-500 lg:w-1/3">Date Of Birth :</p>
                            <p className="text-xl text-gray-600">{localStorage.getItem("docDob")}</p>
                        </div>

                        <div className="flex gap-2">
                            <p className="text-xl text-emerald-500 lg:w-1/3">Contact No. :</p>
                            <p className="text-xl text-gray-600">{localStorage.getItem("docContact")}</p>
                        </div>

                        <div className="flex gap-2">
                            <p className="text-xl text-emerald-500 lg:w-1/3">Email :</p>
                            <p className="text-xl text-gray-600">{localStorage.getItem("docEmail")}</p>
                        </div>

                    

                    </div>
                    
                </div>
                {/* https://images.pexels.com/photos/2272853/pexels-photo-2272853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                </div>

            <div className="m-5 bg-white p-5 rounded-xl border-2 border-gray-300">
                <p className="text-2xl text-gray-600 font-medium"><span className=" text-emerald-500">D</span>octor<span className=" text-emerald-500">'</span>s <span className=" text-emerald-500">C</span>omment</p>
                <p className="p-5 text-gray-600 text-center text-lg">{localStorage.getItem("comment")}</p>
            </div>


            <ImageSlider showImage ={showImage}/>
            <div className="bg-white p-5 m-5 rounded-xl border-2 border-gray-300">
                <p className="text-2xl font-medium text-gray-600"><span className=" text-emerald-500">W</span>ant <span className=" text-emerald-500">T</span>o <span className=" text-emerald-500">U</span>pload <span className=" text-emerald-500">A</span>ny <span className=" text-emerald-500">I</span>mage</p>
                <input className='hidden' type='file' id='file' accept='image/*' onChange={({target: {files}})=>{
                    files[0] && setFileName(files[0].name)
                    if(files){
                        setImage(URL.createObjectURL(files[0]))
                        setFile(files[0])
                    }
                }}></input>
               <div  className='flex flex-col items-center justify-center gap-5 border-2 border-dashed border-gray-200 lg:relative p-10 rounded-xl m-5'>
                {
                    image ? <img className='w-1/3 object-cover' src={image} width={300} height={150} alt={fileName}/>:
                    <label className='lg:text-2xl text-gray-400 font-medium tracking-wider' for= 'file'>Click Here To Select Image</label>
                }
                
                <div className='flex flex-col gap-5 lg:absolute right-10'>
                <div onClick={UploadImage} className='flex items-center gap-2 lg:gap-5 text-sm lg:text-2xl border-2 border-emerald-500 p-2  lg:px-5 rounded-xl shadow-xl text-gray-700  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer'>
                    <FontAwesomeIcon className='text-emerald-500' icon={faCloudUpload} size="2x" color="gray"></FontAwesomeIcon>
                    <p>Upload Image</p>
                </div>

                {
                    image ? <div onClick={()=> {setImage(null); setFileName(""); SetProgress(null)}} className='flex items-center gap-5 text-2xl border-2 border-red-500 p-2 pl-5 pr-5 rounded-xl shadow-xl text-gray-700  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer'>
                    <FontAwesomeIcon className='text-red-500' icon={faXmark} size="2x" color="gray"></FontAwesomeIcon>
                    <p>Clear Selection</p>
                </div>:<></>
                }
                {
                    progress ? <ProgressBar bgColor='#50C878' completed={progress}/> :<></>
                }
                </div>
                
               </div>
            </div>


            <BiopsySlider showImage ={showImage} />
            <div className='m-5 rounded-xl border-2 border-gray-300'>
            <ReportSlider />
            </div>
            
            <div className="bg-white  p-5">
                <p className="text-2xl font-medium text-gray-600"><span className=" text-emerald-500">W</span>ant <span className=" text-emerald-500">T</span>o <span className=" text-emerald-500">U</span>pload <span className=" text-emerald-500">A</span>ny <span className=" text-emerald-500">C</span>omment</p>
                
                <div className='m-5 w-5/6 p-3 border-2 border-gray-400 rounded-xl shadow-lg flex justify-between'>
                <input id="commentBox" type="text" placeholder="Upload comments..."className='w-full  outline-none focus:text-gray-700  text-gray-500 lg:text-xl focus:text-xl placeholder-gray-400'></input>
                <div onClick={uploadComment} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer lg:w-1/6 flex bg-emerald-500 p-1 lg:p-2 text-white gap-2 rounded-lg lg:rounded-xl items-center justify-center lg:text-lg">
                    <FontAwesomeIcon className="hidden lg:flex"  icon={faUserDoctor} size="2x" color="white"></FontAwesomeIcon>
                    <p >Comment</p>
                </div>
                </div>
            </div>

            <div className="bg-white p-2 lg:p-5 flex justify-end gap-2 lg:gap-5 m-5 rounded-xl border-2 border-gray-300">
                <button onClick={removepatient} className="py-2 px-5 bg-red-500 rounded-lg lg:rounded-xl lg:text-xl text-white font-thin active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Remove</button>
                <button onClick={updateComment} className="py-2 px-5 bg-emerald-500 rounded-lg lg:rounded-xl lg:text-xl text-white font-thin active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer"> Update</button>
            </div>

            <div className="flex flex-col items-end gap-1 text-xs m-5 text-gray-500">
                    <p><span className="text-red-500 font-medium text-xs lg:text-base">*</span> Remove - Don't Have Any Suggention For This Patient. So Remove From Refered Patient List</p>
                    <p><span className="text-red-500 font-medium text-xs lg:text-base">*</span> Update -  Provided Suggention Now Update The Refered Patient List</p>
            </div>

            <Footer/>

            <div className='fixed z-10'>
              <EnlargeImage visible={open} closeImage={closeImage} />
              </div> 
        </div>
    );
 }
