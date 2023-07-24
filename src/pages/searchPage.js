import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import ReferedPatientCard from '../components/ReferdPatientCard';
import { onValue, ref } from 'firebase/database';
import { db } from '../googleSignIn/config';
import React from 'react';

export class SearchPage extends React.Component{
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
        const searchRef = ref(db, "referredPatientsList")
        let keys = []
        onValue(searchRef, (snapshot)=>{
            snapshot.forEach((childSnap)=>{
                const nameSearchRef = ref(db, "referredPatientsList/"+childSnap.key)
                onValue(nameSearchRef, (snap)=>{
                    if(snap.val()["referredDocId"] == localStorage.getItem("currentUserId")){
                        if(snap.val()["status"] == "referred"){
                            // patientKeys.push(snap.val()["patientId"])
                            // docKeys.push(snap.val()["docId"])
                            const patientRef = ref(db,"DoctorsList/"+snap.val()["docId"]+"/PatientList/"+snap.val()["patientId"])
                            onValue(patientRef, (childSnaps)=>{
                                if(childSnaps.val()["name"] == name){
                                    keys.push(childSnap.key)
                                }
                            })

                        }
                    }
                }) 
            })
            this.setState({
                patientsKeyList:keys,
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
                <div className="p-2 grid grid-cols-2 gap-2 h-screen bg-gray-200  lg:grid-cols-2">
                  {this.state.patientsKeyList.map((key, index)=>{
                console.log("key == "+ key)
                    return(
                        <ReferedPatientCard referredId={key}/>
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
