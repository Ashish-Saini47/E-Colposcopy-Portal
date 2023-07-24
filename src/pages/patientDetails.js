import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faXmark  } from "@fortawesome/free-solid-svg-icons";

import PatientProfile from '../components/ProfileCard';
import FixedNavBar from '../components/FixedNavBar';
import Footer from '../components/Footer';


import {useState } from "react";
import ImageSlider from '../components/ImageSlider';
import BiopsySlider from '../components/BiopsySlider';
import ReportSlider from '../components/ReportSlider';
import { db, storage } from '../googleSignIn/config';
import { ref, uploadBytesResumable,getDownloadURL  } from 'firebase/storage';

import ProgressBar from '@ramonak/react-progress-bar';
import UploadSuccessDialog from '../components/UploadSuccessDialog';
import EnlargeImage from '../components/EnlargeImage';
import {  ref as databaseRef, update } from 'firebase/database';
import { format } from 'date-fns';




export default function PatientsDetails(){   
    let [open, setOpen] = useState(false);
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
                // const dataRef = databaseRef(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/" + localStorage.getItem("currentPatientId") +"/Images/"+ date )
              update(databaseRef(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/" + localStorage.getItem("currentPatientId") +"/Images/"+ date ),{
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
        <div className='bg-gray-100'>
            <UploadSuccessDialog onClose={closeDialog} visible={showDialog}/>
            <FixedNavBar />
            <PatientProfile/>
            <ImageSlider showImage ={showImage}/>
            <div className='m-5 rounded-xl p-5 bg-white '>
                <h1 className='text-3xl font-medium text-gray-500'><span className='text-emerald-500'>U</span>pload <span className='text-emerald-500'>I</span>mage</h1>
                <input className='hidden' type='file' id='file' accept='image/*' onChange={({target: {files}})=>{
                    files[0] && setFileName(files[0].name)
                    if(files){
                        setImage(URL.createObjectURL(files[0]))
                        setFile(files[0])
                    }
                }}></input>
               <div  className='flex flex-col items-center justify-center gap-5 border-2 border-dashed border-gray-200 relative p-10 rounded-xl m-5'>
                {
                    image ? <img className='w-1/3 object-cover' src={image} width={300} height={150} alt={fileName}/>:
                    <label className='text-sm lg:text-2xl text-gray-400 lg:font-medium lg:tracking-wider' for= 'file'>Click Here To Select Image</label>
                }
                
                <div className='flex flex-col gap-5 lg:absolute lg:right-10'>
                <div onClick={UploadImage} className='flex items-center gap-3 lg:gap-5 text-sm  lg:text-2xl border-2 border-emerald-500 p-2 lg:pl-5 lg:pr-5 rounded-xl shadow-xl text-gray-700  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer'>
                    <FontAwesomeIcon className='text-emerald-500' icon={faCloudUpload} size="2x" color="gray"></FontAwesomeIcon>
                    <p>Upload Image</p>
                </div>

                {
                    image ? <div onClick={()=> {setImage(null); setFileName(""); SetProgress(null)}} className='flex items-center gap-3 lg:gap-5 text-sm lg:text-2xl border-2 border-red-500 p-2 lg:pl-5 lg:pr-5 rounded-xl shadow-xl text-gray-700  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer'>
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
            
            <ReportSlider/>

            <Footer/>
            
            <div className='fixed z-10'>
              <EnlargeImage visible={open} closeImage={closeImage} />
              </div> 
            

        </div>

      
    );
}
