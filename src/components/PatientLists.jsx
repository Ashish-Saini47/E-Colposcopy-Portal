import React, { PureComponent } from 'react'
import PatientCard from './patientCard';
import { db } from '../googleSignIn/config';
import { onValue, ref } from 'firebase/database';

export class PatientLists extends PureComponent {
    constructor(){
        super();
        this.state={
            patientsKeyList:[]
        }
    }

    componentDidMount(){
        const docRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList")
        onValue(docRef, (snapshot)=>{
            let keys = []
            snapshot.forEach((snap)=>{
                keys.push(snap.key)
                console.log("abc == "+snap.key)
            })
            this.setState({
                patientsKeyList:keys
            })  
        })
    }

  render() {
    return (
      <>
      {(this.state.patientsKeyList.length) > 0 ? <div className="p-2 grid grid-cols-2 gap-2 lg:w-5/6 h-screen bg-gray-200 lg:absolute right-0  lg:grid-cols-5">
                {/* <PatientCard/> */}
                {this.state.patientsKeyList.map((key, index)=>{
                    console.log(key)
                    return(
                      
                        <PatientCard patientId={key}/>
                    )
                }
        )}

            </div> :
            <div className="flex items-center justify-center w-full lg:w-5/6 h-screen absolute right-0 bg-gray-200">
                <p className="font-bold text-2xl text-gray-500">
                    No Patient Found 
                </p>
            </div> 
        }
      </>
    )
  }
}

export default PatientLists