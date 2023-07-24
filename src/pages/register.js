import React from 'react';
import { ref,set} from "firebase/database";
import DatePickerComp from '../components/datePicker';
import Dropdown from '../components/dropdown';
import { db } from '../googleSignIn/config';
import Alert from '../components/Alert';
import {useNavigate } from "react-router-dom";


export class RegisterUser extends React.Component{
    constructor(){
        super();
        this.state={
            alert:null
        }
        this.createUser = this.createUser.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }
    componentDidMount(){
        var contactBox = document.getElementById("contact");
        var invalidChars = ["-", "+", "e"];
        contactBox.addEventListener("keydown", function(e) {
            if (invalidChars.includes(e.key)) {
              e.preventDefault();
            }
            if((contactBox.value).length >= 10){
                if("Backspace" != e.key){
                    e.preventDefault();
                }
            }
          });
    }

    showAlert(mesg, bgClass, textClass){
        console.log("show alert")
        this.setState({
            alert:{
                message:mesg,
                bgclass:bgClass,
                textclass:textClass
            }
        })
        setTimeout(()=>{
            this.setState({
                alert:null
            })
            console.log("time completed")
        },5000)
    }

    createUser(){
    //    console.log(document.getElementById("contact").value)
        // console.log(localStorage.getItem("gender")+" in gender")
        var contactBox = document.getElementById("contact");
        var today = new Date();
        var birthDate = new Date(localStorage.getItem("dateSelected"));

        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
            age_now--;
        }

        if((contactBox.value).length < 10){
            this.showAlert("Please Contact Number Is Not Correct", "bg-red-100", "text-red-800")
           
        }
        else if(localStorage.getItem("gender") == null){
            this.showAlert("Please Select Gender", "bg-red-100", "text-red-800")
            
        }
        else if(localStorage.getItem("dob")==null){
            this.showAlert("Please Select Date Of Birth", "bg-red-100", "text-red-800")
            
        }
        else if(age_now <=20){
            this.showAlert("Minimum Age Limit Is 21 Years", "bg-red-100", "text-red-800")
            
        }
        else{
            set(ref(db, "EmailsList/"+localStorage.getItem("currentUserId")),{
                "Name":localStorage.getItem("name"),
                "email":localStorage.getItem("email"),
                "role":"doctor"
            })
            set(ref( db, "DoctorsList/"+localStorage.getItem("currentUserId")),{
                "name":localStorage.getItem("name"),
                "email":localStorage.getItem("email"),
                "dob":localStorage.getItem("dob"),
                "mobile":contactBox.value,
                // "key":"abcdefgh",
                "gender":localStorage.getItem("gender")
            })
            this.props.navigate("/keyNotFound")
        }


       
    }

    render(){
        return(
            <>
                <Alert alert = {this.state.alert}/>
                <div className="w-full h-screen">
                    <div className="flex w-full h-screen">
                        
                        <div className="w-full m-2 flex items-center justify-center lg:w-1/2">
                            <div className='bg-white px-10 py-16 rounded-3xl border-2 border-gray-200'>
                                <h1 className='text-2xl lg:text-5xl font-semibold'>Enter Your Details</h1>
                                <p className='font-medium text-sm lg:text-lg text-gray-500 mt-4'>Please enter your details for personalize your experience</p>
                                <div className='mt-8'>
                                    <div>
                                        <label className='text-sm lg:text-lg font-medium'>Email</label>
                                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Your Email' type='email' value={localStorage.getItem("email")} disabled="disabled"/>

                                    </div>
                                    <div >
                                        <label className='text-sm lg:text-lg font-medium'>Name</label>
                                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Your Full Name' type='text' value={localStorage.getItem("name")} disabled="disabled"/>
                                    </div>
                                    <div >
                                        
                                        <div className='flex'>
                                        <label  className='text-sm lg:text-lg font-medium'>Contact No.</label>
                                        <h6 className='text-red-500 ml-2'>*</h6>
                                        </div>
                                        <input id='contact' type='number'  className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Your Contact No.'/>
                                    </div>
                                    <div >
                                        <div className='flex'>
                                        <label  className='text-sm lg:text-lg font-medium'>Gender</label>
                                        <h6 className='text-red-500 ml-2'>*</h6>
                                        </div>
                                        
                                        <Dropdown/>
                                    </div>

                                    <div >
                                        <div className='flex'>
                                        <label  className='text-sm lg:text-lg font-medium'>Date Of Birth</label>
                                        <h6 className='text-red-500 ml-2'>*</h6>
                                        </div>
                                        
                                        <DatePickerComp/>
                                    </div>
                                </div> 
                                <div className='mt-8 flex flex-col gap-y-4'>
                                <button onClick={this.createUser} className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-emerald-500 text-white text-lg font-bold'>Save & Continue</button>
                                </div> 
                                <p className='text-xs pt-4 flex justify-end text-red-500'>* Fields are Required</p>
                            </div>
                        </div>
                        <div className="hidden lg:flex relative w-1/2 h-full items-center justify-center bg-gray-200">
                            <div className="w-60 h-60 bg-gradient-to-tr from-emerald-500 to-white-500 rounded-full animate-bounce"/>
                            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
                        </div>
                    </div>

                    <div className="flex justify-center  w-full">
                        <p className="font-medium text-sm mb-2 ">
                            @ Developed By :- CSIR-CEERI 2023
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

export function RegisterUserRoute(props){
    const navigate = useNavigate();
    return(<RegisterUser navigate = {navigate}></RegisterUser>)
}

export default RegisterUser;