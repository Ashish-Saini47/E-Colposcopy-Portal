import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import ReferedPatientCard from '../components/ReferdPatientCard';
import { onValue, ref } from 'firebase/database';
import { db } from '../googleSignIn/config';
import React from 'react';
import PatientCard from '../components/patientCard';

export class PantientSearchPage extends React.Component{
    constructor(){
        super();
        this.state={
            patientsKeyList:[],
        }
        this.searchPatient = this.searchPatient.bind(this);
    }
     searchPatient(){
        var name = document.getElementById("search").value
        var searchResult = document.getElementById("searchResult")
        const docRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList")
        onValue(docRef, (snapshot)=>{
            let keys = []
            snapshot.forEach((snap)=>{
                // keys.push(snap.key)
                // console.log("abc == "+snap.key)
                const patientRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/"+snap.key);
                onValue(patientRef, (snapshot)=>{
                    if(snapshot.val()["name"] == name)
                    keys.push(snap.key)
                });
            })
            this.setState({
                patientsKeyList:keys
            })  
        })
        searchResult.classList.remove("hidden")
    }
    render(){
        return(
            <div className='w-full h-screen bg-gray-200 p-5'>
                <div className='bg-white p-3 rounded-xl flex gap-5 items-center'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}color="gray" size="xl"/>
                    <input id='search' type="text" placeholder="Enter Pantient Name For Search...."className='w-full  outline-none focus:text-gray-700  text-gray-500 text-xl focus:text-xl placeholder-gray-300'></input>
                    <FontAwesomeIcon icon={faXmark}color="gray" size="xl"/>
                    <p onClick={this.searchPatient} className='bg-emerald-500 pt-1 pb-1 pr-3 pl-3 rounded-lg drop-shadow-xl text-white text-lg font-medium text-gray-200 active:scale-[.98] active:duration-75 ease-in-out transition-all cursor-pointer'>Search</p>
                </div>
            <div id={"searchResult"} className='hidden'>
            
            {this.state.patientsKeyList.length == 0 ?  <div className='flex justify-center p-5 '>
                    <p className='text-2xl text-gray-500'>No Patient/Record Found</p>
                </div> :
                <div className="p-2 grid grid-cols-2 gap-2 h-screen bg-gray-200  lg:grid-cols-5">
                  {this.state.patientsKeyList.map((key, index)=>{
                console.log("key == "+ key)
                    return(
                        <PatientCard patientId={key}/>
                    )
                }
        )}
                </div>
                }
          
            
            

            </div>
            </div>
        );
    }
}
