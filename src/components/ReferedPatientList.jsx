import React from 'react'
import ReferedPatientCard from './ReferdPatientCard';
import { onValue, ref } from 'firebase/database';
import { db } from '../googleSignIn/config';

export class ReferedPatientList extends React.Component{
    constructor(){
        super();
        this.state={
            patientsKeyList:[]
        }
    }

    componentDidMount(){
        const docRef = ref(db, "referredPatientsList")
        onValue(docRef, (snapshot)=>{
            console.log(snapshot.key)
            let keys = []
            snapshot.forEach((snap)=>{
                const referredRef = ref(db, "referredPatientsList/"+snap.key)
                onValue(referredRef, (snapChild)=>{
                    console.log("abc == "+snapChild.val()["referredDocId"])
                    if(snapChild.val()["referredDocId"] == localStorage.getItem("currentUserId")){
                        if(snapChild.val()["status"] == "referred"){
                            keys.push(snap.key)
                        }
                        // localStorage.setItem("comment",snapChild.val()["comment"] )
                       
                    }
                })
                // keys.push(snap.key)
                // console.log("abc == "+snap.key)
            })
            this.setState({
                patientsKeyList:keys
            })  
        })
    }

    render(){
        return(
            <>
            <div className="p-2 grid lg:grid-cols-2 gap-2 lg:w-5/6 h-screen bg-gray-200 absolute right-0  lg:grid-cols-2">
            {this.state.patientsKeyList.map((key, index)=>{
                console.log("key == "+ key)
                    return(
                        <ReferedPatientCard referredId={key}/>
                    )
                }
        )}
            </div>
            

            </>
        )
    }
}